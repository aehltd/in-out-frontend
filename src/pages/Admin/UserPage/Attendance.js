import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditingList from "../../../components/EditingList";
import {
  getUserAttendance,
  addAttendanceRecord,
  deleteAttendanceRecord,
  editAttendanceRecord,
} from "../../../api/attendanceAPI";
import useUserData from "../../../hooks/useUserData";
import useList from "../../../hooks/useList";
import Calendar from "../../../components/Calendar";

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

  //handle adding a new attendance
  const handleAdd = async (newItem) => {
    console.log("Tried to add new item.");
    console.table(await addAttendanceRecord(id, newItem));
    loadList();
  };
  //handle editing an attendance
  const handleEdit = async (newItem) => {
    console.log(`Tried to edit item: ${newItem._id}`);
    console.table(await editAttendanceRecord(newItem));
    loadList();
  };
  //handle deleting an attendance
  const handleDelete = async (item) => {
    console.log(`Tried to delete item: ${item._id}`);
    console.table(await deleteAttendanceRecord(item._id));
    loadList();

  };

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

  if (listLoading) pageContent = <p>Loading...</p>;
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
        <EditingList
          list={list}
          fields={{ date: "datetime-local", isClockedIn: "checkbox" }}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        >
          <span className="block text-3xl font-bold text-center">{title}</span>
        </EditingList>
        <Calendar list={list}/>
      </>
    );
    backLink = (
      <div className="flex justify-start mt-6">
        <button className="btn" onClick={handleNavToUser}>Back to user</button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl">
      <div className="flex">
        {pageContent}
      </div>
      {backLink}
    </div>
  );
};

export default AdminUserAttendancePage;
