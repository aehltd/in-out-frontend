import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../../components/UserList";
import useAllUserData from "../../hooks/useAllUserData";
import { emptyCache } from "../../utils/cache";
import Modal from "../../components/Modal";
import NotificationForm from "../../components/NotificationForm";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const { users, loading, error } = useAllUserData();
  const [openModal, setOpenModal] = useState(false);

  //Validators
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  useEffect(() => {
    if (role !== "admin") navigate("/access-denied");
  }, [role, navigate]);

  // Handle new meeting
  const handleNewMeeting = () => {
    console.log("NEW MEETING");
    setOpenModal(true);
  };
  const handleSubmit = (scheduleItem) => {
    console.log("Hello");
    navigate("/");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  // Handle new task
  const handleNavToSettings = () => {
    navigate("/settings");
  };

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

  return (
    <>
      <Modal isOpen={openModal} size="md">
        <span className="block text-lg font-bold mr-6">New Schedule Item</span>
        <NotificationForm onCancel={handleCloseModal} onSubmit={handleSubmit} />
      </Modal>
      <div className="container max-w-sm">
        <h1>Admin Page</h1>
        <div>
          <h2>Welcome, {name}!</h2>
        </div>
        <h3>Actions</h3>
        <button className="btn" onClick={handleNewMeeting}>
          Send out a new notification
        </button>
        {loading && <LoadingSpinner />}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <UserList users={users} onUserClick={handleUserClick} />
        )}
        <div className="flex justify-between mt-6">
          <button className="btn btn-secondary" onClick={handleLogout}>
            Log out
          </button>
          <button className="btn btn-icon" onClick={handleNavToSettings}>
            <span className="material-icons-outlined align-middle">
              manage_accounts
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
