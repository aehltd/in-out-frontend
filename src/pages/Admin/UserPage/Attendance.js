import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericList from "../../../components/GenericList";
import {
  getUserAttendance,
  addAttendanceRecord,
  deleteAttendanceRecord,
  editAttendanceRecord,
} from "../../../api/attendanceAPI";
import useUserData from "../../../hooks/useUserData";
import useList from "../../../hooks/useList";
import Calendar from "../../../components/Calendar";
import Modal from "../../../components/Modal";
import useModal from "../../../hooks/useModal";
import GenericAddEditDelete from "../../../components/GenericAddEditDelete";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useMode from "../../../hooks/useMode";

const AdminUserAttendancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Validators
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  useEffect(() => {
    if (role !== "admin") navigate("/access-denied");
  }, [role, navigate]);

  const { user, loading: userLoading, error: userError } = useUserData(id);
  const {
    list,
    loading: listLoading,
    error: listError,
    loadList,
  } = useList(id, getUserAttendance);
  const {
    openModal,
    selectedItem,
    modalType,
    openModalWithType,
    handleModalClose,
    createDefaultItem,
  } = useModal();
  const { mode, handleModeChange, amIDisabled } = useMode("calendar");
  const attendanceFields = { date: "datetime-local", isClockedIn: "checkbox" };

  //handle editing/add/delete clicks
  const handleClick = (type = null, item = null) => {
    if (type === null) {
      console.log("Type is null, returning.");
      return;
    }
    if (item === null) item = createDefaultItem(attendanceFields);
    console.log("Tried to open modal.");
    console.log("Type: ", type);
    console.log("Item: ", item);
    openModalWithType(type, item);
  };

  //handle submitting the modal
  const handleModalSubmit = async (type, item) => {
    try {
      if (type === "add") {
        await addAttendanceRecord(id, item);
      } else if (type === "edit") {
        await editAttendanceRecord(item);
      } else if (type === "delete") {
        await deleteAttendanceRecord(item._id);
      }
      await loadList();
    } catch (error) {
      console.error("Error handling modal submit: ", error);
    } finally {
      handleModalClose();
    }
  };

  const handleNavToDashboard = () => {
    navigate("/admin");
  };

  const handleNavToUser = () => {
    navigate(`/admin/users/${id}`);
  };

  return (
    <div className="container max-w-md">
      <div>
        <div className="flex justify-center items-center">
          <span className="block text-3xl font-bold text-center mb-4">
            {userLoading && "Loading..."}
            {userError && userError}
            {!userLoading && !userError && (
              <>
                {user.name}'s <br /> Attendance Record
              </>
            )}
          </span>
        </div>
        {listLoading && <LoadingSpinner />}
        {listError && <p>{listError}</p>}
        {!listLoading && !listError && (
          <>
            <Modal isOpen={openModal} size="sm">
              <GenericAddEditDelete
                type={modalType}
                fields={attendanceFields}
                onCancel={handleModalClose}
                onSubmit={handleModalSubmit}
                initialData={selectedItem}
              />
            </Modal>
            <div className="w-full flex items-center justify-evenly">
              {/* <span>
            Days late: 
            <span className="font-bold">
              {list.filter((item) => item.isLate).length}
            </span>
          </span> */}
              <span>
                Days Clocked In:{" "}
                <span className="font-bold">{list.length}</span>
              </span>
              <span>
                Late Percent:{"  "}
                <span className="font-bold">
                  {(
                    (list.filter((item) => item.isLate).length / list.length) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </span>
            </div>
            {mode === "list" && (
              <GenericList
                list={list}
                fields={attendanceFields}
                onClick={handleClick}
              />
            )}
            {mode === "calendar" && (
              <Calendar
                list={list}
                fields={attendanceFields}
                onClick={handleClick}
              />
            )}{" "}
          </>
        )}
      </div>

      <div className="flex justify-between mt-6">
        {listError ||
          (userError && (
            <>
              <button
                className="btn btn-secondary"
                onClick={handleNavToDashboard}
              >
                Back to dashboard
              </button>
            </>
          ))}
        {!listError && !userError && (
          <>
            <button className="btn btn-secondary" onClick={handleNavToUser}>
              Back to user
            </button>
            <div className="flex space-x-2">
              <button
                className="btn btn-icon"
                disabled={amIDisabled("list")}
                onClick={() => handleModeChange("list")}
              >
                <span className="material-icons-outlined align-middle">
                  reorder
                </span>
              </button>
              <button
                className="btn btn-icon"
                disabled={amIDisabled("calendar")}
                onClick={() => handleModeChange("calendar")}
              >
                <span className="material-icons-outlined align-middle">
                  calendar_today
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserAttendancePage;
