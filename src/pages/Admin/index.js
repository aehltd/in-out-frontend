import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../../components/UserList";
import useAllUserData from "../../hooks/useAllUserData";
import { emptyCache } from "../../utils/cache";

const AdminPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // States for user list
  const {users, loading, error} = useAllUserData();
  let pageContent;

  //Validators
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  useEffect(() => {
    if (role !== "admin") navigate("/access-denied");
  }, [role, navigate]);

  // Handlers

  // Handle new meeting
  const handleNewMeeting = () => {
    console.log("NEW MEETING");
    navigate("/admin/new-notification");
  }

  // Handle new task
  const handleNewTask = () => {
    console.log("NEW TASK");
  }

  // Handle user click
  const handleUserClick = (user) => {
    //navigate(`/admin/${user._id}`);
    console.log(`I'm navigating to user ${user.name}'s page. ID: ${user._id}`);
    navigate(`/admin/users/${user._id}`);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    emptyCache();
    navigate("/login");
  };

  if (loading) pageContent = <p>Loading...</p>;
  else if (error) pageContent = <p>{error}</p>;
  else pageContent = <UserList users={users} onUserClick={handleUserClick} />;

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Welcome, {name}!</h2>
      </div>
      <h3>Actions</h3>
      <button onClick={handleNewMeeting}>Create a new meeting...</button>
      <button onClick={handleNewTask}>Assign a new task...</button>
      <h3>All Users</h3>
      {pageContent}
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminPage;
