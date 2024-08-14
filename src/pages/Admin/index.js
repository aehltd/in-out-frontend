import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../../components/UserList";
import useAllUserData from "../../hooks/useAllUserData";
import { emptyCache } from "../../utils/cache";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const { users, loading, error } = useAllUserData();

  //Validators
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  useEffect(() => {
    if (role !== "admin") navigate("/access-denied");
  }, [role, navigate]);

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
      <div className="container max-w-sm">
        <h1 className="flex w-full justify-center text-xl my-4">
          Welcome, {name}! 📋
        </h1>

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
            <span className="material-symbols-outlined align-middle">
              manage_accounts
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
