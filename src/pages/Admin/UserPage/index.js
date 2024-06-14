import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";

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

  const { 
    user,
    loading, 
    error 
  } = useUserData(id);
  let pageContent;

  if (loading) pageContent = <p>Loading...</p>;
  else if (error) pageContent = <p>{error}</p>;
  else
    pageContent = (
      <div>
        <h1>{user.name}</h1>
        <p>ID: {user._id}</p>
        <p>Role: {user.role}</p>
        <p>Email: {user.email}</p>
        <p>
          <Link to={`/admin/attendance/${user._id}`}>Attendance</Link>
        </p>
        <p>
          <Link to={`/admin/kpi/${user._id}`}>KPI</Link>
        </p>
      </div>
    );

  return (
    <div>
      <h1>Admin User Page</h1>
      {pageContent}
      <p>
        <Link to="/admin">Back to list</Link>
      </p>
    </div>
  );
};

export default AdminUserPage;
