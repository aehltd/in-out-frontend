import React from "react";
import { useNavigate } from "react-router-dom";
import useList from "../../hooks/useList";
import useMode from "../../hooks/useMode";
import GenericList from "../../components/GenericList";
import { getUserAttendance } from "../../api/attendanceAPI";
import Calendar from "../../components/Calendar";

const UserAttendancePage = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");

  const { list, loading, error } = useList(null, getUserAttendance);

  const { mode, handleModeChange, amIDisabled } = useMode("calendar");

  const attendanceFields = { date: "datetime-local", isClockedIn: "checkbox" };

  const handleNavToHome = () => {
    navigate("/");
  };

  let listContent;
  let backLink;

  if (loading) listContent = <p>Loading...</p>;
  else if (error) {
    listContent = <p>{error.message}</p>;
  } else
    listContent = (
      <>
        {mode === "list" && (
          <GenericList list={list} fields={attendanceFields} />
        )}
        {mode === "calendar" && (
          <Calendar list={list} fields={attendanceFields} />
        )}
      </>
    );

  backLink = (
    <div className="flex justify-between mt-6">
      <button className="btn" onClick={handleNavToHome}>
        Back to home
      </button>
      <div className="flex">
        <button
          className="btn btn-icon"
          disabled={amIDisabled("list")}
          onClick={() => handleModeChange("list")}
        >
          <span class="material-icons-outlined align-middle">reorder</span>
        </button>
        <button
          className="btn btn-icon"
          disabled={amIDisabled("calendar")}
          onClick={() => handleModeChange("calendar")}
        >
          <span class="material-icons-outlined align-middle">
            calendar_today
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container max-w-md">
      <div className="flex justify-center items-center mb-4">
        <span className="block text-3xl font-bold text-center">
          {name}'s <br /> Attendance Record
        </span>
      </div>
      {listContent}
      {backLink}
    </div>
  );
};

export default UserAttendancePage;
