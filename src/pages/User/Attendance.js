import React from "react";
import { useNavigate } from "react-router-dom";
import useList from "../../hooks/useList";
import ViewingList from "../../components/ViewingList";
import { getUserAttendance } from "../../api/attendanceAPI";

const UserAttendancePage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  
  const {
    list,
    loading,
    error
  } = useList(token, null, getUserAttendance);

  let title;
  let pageContent;
  let backLink;

  title = <h1>Attendance Record for {name}</h1>;
  if (loading) pageContent = <p>Loading...</p>;
  else if (error) { pageContent = <p>{error.message}</p>; }
  else pageContent = (
    <div>
        <button>Clock in</button>
        <ViewingList list={list} fields={{ date: "datetime-local", isClockedIn: "checkbox" }} />
    </div>
  )
  backLink = <button onClick={() => navigate("/")}>Back to home</button>

  return (
    <div>
      {title}
      {pageContent}
      {backLink}
    </div>
  )
} 

export default UserAttendancePage;