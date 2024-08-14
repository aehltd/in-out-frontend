import React from "react";
import { useNavigate } from "react-router-dom";
import useList from "../../hooks/useList";
import useMode from "../../hooks/useMode";
import GenericList from "../../components/GenericList";
import { getUserAttendance } from "../../api/attendanceAPI";
import Calendar from "../../components/Calendar";
import LoadingSpinner from "../../components/LoadingSpinner";
import useCalendar from "../../hooks/useCalendar";

const UserAttendancePage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const { list, loading, error } = useList(null, getUserAttendance);
  const { mode, handleModeChange, amIDisabled } = useMode("calendar");
  const { currentMonth, handlePrevMonth, handleNextMonth } = useCalendar();
  const attendanceFields = { date: "datetime-local", isClockedIn: "checkbox" };

  const handleNavToHome = () => {
    navigate("/");
  };

  return (
    <div className="container max-w-md">
      <div className="flex justify-center items-center mb-4">
        <span className="block text-3xl font-bold text-center">
          {name}'s <br /> Attendance Record
        </span>
      </div>
      {loading && <LoadingSpinner />}
      {error && <p>{error.message}</p>}
      {!loading && !error && (
        <>
          {mode === "list" && (
            <GenericList list={list} fields={attendanceFields} />
          )}
          {mode === "calendar" && (
            <Calendar
              currentMonth={currentMonth}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              list={list}
              fields={attendanceFields}
            />
          )}
        </>
      )}
      <div className="flex justify-between mt-6">
        <button className="btn btn-secondary" onClick={handleNavToHome}>
          Back to home
        </button>
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
      </div>
    </div>
  );
};

export default UserAttendancePage;
