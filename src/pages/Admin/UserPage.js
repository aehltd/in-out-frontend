import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericList from "../../components/GenericList";
import {
  getUserAttendance,
  addAttendanceRecord,
  deleteAttendanceRecord,
  editAttendanceRecord,
} from "../../api/attendanceAPI";
import useUserData from "../../hooks/useUserData";
import useList from "../../hooks/useList";
import Calendar from "../../components/Calendar";
import Modal from "../../components/Modal";
import useModal from "../../hooks/useModal";
import GenericAddEditDelete from "../../components/GenericAddEditDelete";
import LoadingSpinner from "../../components/LoadingSpinner";
import useMode from "../../hooks/useMode";
import useCalendar from "../../hooks/useCalendar";
import { getCurrentDate } from "../../utils/dateFormatting";

const AdminUserPage = () => {
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

  const { currentMonth, handlePrevMonth, handleNextMonth } = useCalendar();

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
        console.log(list);
        await addAttendanceRecord(id, item);
        console.log(item);
      } else if (type === "edit") {
        console.log(list);
        await editAttendanceRecord(item);
        console.log(item);
      } else if (type === "delete") {
        console.log(list);
        await deleteAttendanceRecord(item._id);
        console.log(item);
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

  const handleDownloadClick = () => {
    const curatedList = list.map((item) => {
      return {
        date: item.date,
        isClockedIn: item.isClockedIn,
        isLate: item.isLate,
      };
    });
    // Sort by date, earliest first
    curatedList.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Convert to CSV
    const csv = [
      ["Date", "Clocked In", "Late"],
      ...curatedList.map((item) => [item.date, item.isClockedIn, item.isLate]),
    ];
    // Convert to CSV string
    const csvString = csv.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });

    // Download using temp link element
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendancedata_${user.name}_${getCurrentDate()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container max-w-md">
      <div>
        <div className="flex flex-col justify-center items-center">
          {userLoading && "Loading..."}
          {userError && userError}
          {!userLoading && !userError && (
            <>
              <h2 className="block text-2xl font-bold text-center">
                {user.name}'s Attendance Record
              </h2>
              <p>Role: {user.role}</p>
            </>
          )}
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
                currentMonth={currentMonth}
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
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
                Back
              </button>
            </>
          ))}
        {!listError && !userError && (
          <>
            <div className="flex space-x-2">
              <button
                className="btn btn-secondary"
                onClick={handleNavToDashboard}
              >
                Back
              </button>
              <button className="btn" onClick={handleDownloadClick}>
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
            <div className="flex">
              <button
                className="btn btn-icon rounded-r-none"
                disabled={amIDisabled("list")}
                onClick={() => handleModeChange("list")}
              >
                <span className="material-symbols-outlined align-middle">
                  reorder
                </span>
              </button>
              <button
                className="btn btn-icon rounded-l-none"
                disabled={amIDisabled("calendar")}
                onClick={() => handleModeChange("calendar")}
              >
                <span className="material-symbols-outlined align-middle">
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

export default AdminUserPage;
