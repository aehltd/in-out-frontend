import React from "react";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router";

const SettingsPage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const {
    user,
    initialState,
    isDisabled,
    loading,
    error,
    handleEnable,
    handleChange,
    handleReset,
    handleSubmit,
  } = useUserData(null);

  const handleNavToHome = () => {
    navigate("/");
  };

  let pageContent;

  if (loading) pageContent = <p>Loading user...</p>;
  else if (error) pageContent = <p>{error}</p>;
  else {
    pageContent = (
      <div>
        <p>ID: {user._id}</p>
        <p>Role: {user.role}</p>
        <div className="mt-4">
          <label
            htmlFor="name"
            className="inline-flex text-sm w-full font-medium justify-between"
          >
            Email
            <button
              id="name"
              className="text-green-500 hover:text-green-600"
              onClick={handleEnable}
            >
              Change
            </button>
          </label>
          <input
            id="name"
            className="input-field"
            value={user.name}
            onChange={handleChange}
            disabled={isDisabled.name}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="inline-flex text-sm w-full font-medium justify-between"
          >
            Email
            <button
              id="email"
              className="text-green-500 hover:text-green-600"
              onClick={handleEnable}
            >
              Change
            </button>
          </label>
          <input
            type="email"
            id="email"
            className="input-field"
            value={user.email}
            onChange={handleChange}
            disabled={isDisabled.email}
          />
        </div>
        <div className="mt-4">
            <span className="flex justify-end">
            <button
                className="btn btn-secondary"
                onClick={handleReset}
            >
                Cancel
            </button>
            <button className="btn" onClick={handleSubmit}>
                Save Changes
            </button>
            </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-sm">
      <h1>User: {name}</h1>
      {pageContent}
      <div className="mt-6 inline-flex justify-between">
        <button className="btn" onClick={handleNavToHome}>
          Back to home
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
