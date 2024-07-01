import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
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

  const { user, loading, error } = useUserData(id);
  let pageContent;

  const handleNavToAttendance = () => {
    navigate(`/admin/attendance/${id}`);
  };

  const handleNavToKPI = () => {
    navigate(`/admin/kpi/${id}`);
  };

  const handleNavToList = () => {
    navigate("/admin");
  };

  if (loading) pageContent = <p>Loading user...</p>;
  else if (error) pageContent = <p>{error}</p>;
  else
    pageContent = (
      <div>
        <h1>{user.name}</h1>
        <UserInfo id={id} />
        <div className="mt-4 flex">
          <button className="btn mr-6" onClick={handleNavToAttendance}>
            Attendance
          </button>
          <button className="btn" onClick={handleNavToKPI}>
            KPI
          </button>
        </div>
      </div>
    );

  return (
    <div className="container max-w-sm">
      <h1>Admin User Page</h1>
      {pageContent}
      <div className="mt-6 flex justify-start">
        <button className="btn" onClick={handleNavToList}>
          Back to list
        </button>
      </div>
    </div>
  );
};

export default AdminUserPage;
