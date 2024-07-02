import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emptyCache } from "../utils/cache";
import ClockInButton from "../components/ClockInButton";

const HomePage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  console.log(token, name, role);

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin");
    }
  }, [role, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const tokenParts = token.split(".")[1];
      const decodedToken = JSON.parse(atob(tokenParts));
      const exp = decodedToken.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      if (now > exp) {
        // Token has expired
        navigate("/login");
      }
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    emptyCache();
    navigate("/login");
  };

  const handleNavToAttendance = () => {
    navigate("/attendance");
  };

  const handleNavToSettings = () => {
    navigate("/settings");
  }

  return (
    <div className="container max-w-sm">
      <span className="block text-lg font-bold mr-6">Home Page</span>
      <span className="block text-lg font-bold mr-6">Welcome, {name}!</span>
      <div className="flex space-x-4">
        <ClockInButton />
        <button className="btn" onClick={handleNavToAttendance}>
          My Attendance
        </button>
      </div>
      <div className="flex justify-between mt-6">
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
        <button className="btn btn-icon" onClick={handleNavToSettings}>
          <span className="material-icons-outlined align-middle">manage_accounts</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
