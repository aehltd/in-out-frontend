import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserInfo } from "../../../components/UserSettings";

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

  const handleNavToAttendance = () => {
    navigate(`/admin/attendance/${id}`);
  };

  const handleNavToKPI = () => {
    navigate(`/admin/kpi/${id}`);
  };

  const handleNavToList = () => {
    navigate("/admin");
  };

  return (
    <div className="container max-w-sm">
      <h1>Admin User Page</h1>
      <div>
        <UserInfo id={id}>
          <div className="flex">
            <button className="btn ml-0 mr-6" onClick={handleNavToAttendance}>
              Attendance
            </button>
            <button className="btn" onClick={handleNavToKPI}>
              KPI
            </button>
          </div>
        </UserInfo>
      </div>
      <div className="mt-6 flex justify-start">
        <button className="btn btn-secondary" onClick={handleNavToList}>
          Back to list
        </button>
      </div>
    </div>
  );
};

export default AdminUserPage;
