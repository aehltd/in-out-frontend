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
  
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useUserData(id);
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
    createDefaultItem
  } = useModal();
  const {
    mode,
    handleModeChange,
    amIDisabled,
  } = useMode('calendar');
  const attendanceFields = { date: "datetime-local", isClockedIn: "checkbox" };
  
  //handle editing/add/delete clicks
  const handleClick = (type = null, item = null) => {
    if (type === null) {
      console.log("Type is null, returning.");
      return;
    }
    if (item === null) item = createDefaultItem(attendanceFields)
    console.log("Tried to open modal.");
    console.log("Type: ", type);
    console.log("Item: ", item);
    openModalWithType(type, item);
  }

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
  }

  const handleNavToDashboard = () => {
    navigate("/admin");
  }

  const handleNavToUser = () => {
    navigate(`/admin/users/${id}`);
  }


  let title;
  let pageContent;
  let backLink;

  if (userLoading) {
    title = "Loading...";
  } else if (userError) {
    title = userError;
  } else {
    title = <>
      {user.name}'s <br /> Attendance Record
    </>;
  }

  if (listLoading) pageContent = <LoadingSpinner/>;
  else if (listError) {
    title = <h1>Error</h1>;
    pageContent = <p>{listError}</p>;
    backLink = (
      <div className="flex justify-end mt-6">
        <button className="btn" onClick={handleNavToDashboard}>Back to dashboard</button>
      </div>
    );
  } else {
    pageContent = (
      <>
        <Modal isOpen={openModal} size='sm'>
          <GenericAddEditDelete
            type={modalType}
            fields={attendanceFields}
            onCancel={handleModalClose}
            onSubmit={handleModalSubmit}
            initialData={selectedItem}
          />
        </Modal>
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
        )}
      </>
    );
    backLink = (
      <div className="flex justify-between mt-6">
        <button className="btn" onClick={handleNavToUser}>Back to user</button>
        <div className="flex">
          <button className="btn btn-icon" disabled={amIDisabled("list")} onClick={() => handleModeChange("list")}>
            <span class="material-icons-outlined align-middle">reorder</span>
          </button>
          <button className="btn btn-icon" disabled={amIDisabled("calendar")} onClick={() => handleModeChange("calendar")}>
            <span class="material-icons-outlined align-middle">calendar_today</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container max-w-md">
      <div>
        <div className="flex justify-center items-center">
        <span className="block text-3xl font-bold text-center mb-4">{title}</span>
        </div>
        {pageContent}
      </div>
      {backLink}
    </div>
  );
};

export default AdminUserAttendancePage;
