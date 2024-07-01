import React from "react";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import PasswordForm from "../components/PasswordForm";
import useModal from "../hooks/useModal";

const SettingsPage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const {
    user,
    isBeingEdited,
    isDisabled,
    loading,
    error,
    handleEnable,
    handleChange,
    handleReset,
    handleSubmit,
  } = useUserData(null);
  const { openModal, handleModalOpen, handleModalClose } = useModal();

  const handleNavToHome = () => {
    navigate("/");
  };

  const handlePasswordCancel = () => {
    handleModalClose();
  };

  const handlePasswordSave = (message) => {
    console.table(message);
    handleModalClose();
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
            Name
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
          <label
            htmlFor="password"
            className="inline-flex text-sm w-full font-medium justify-between items-center"
          >
            Password
            <button
              className="btn btn-secondary mr-0"
              onClick={handleModalOpen}
            >
              Change Password
            </button>
          </label>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal isOpen={openModal} size="xs">
        <PasswordForm
          onCancel={handlePasswordCancel}
          onSubmit={handlePasswordSave}
        />
      </Modal>
      <div className="container max-w-sm">
        <h1>User: {name}</h1>
        {pageContent}
        <div className="mt-6 inline-flex w-full justify-between">
          <button className="btn btn-secondary ml-0" onClick={handleNavToHome}>
            Back to home
          </button>
          {isBeingEdited && (
            <div>
              <span className="flex justify-end">
                <button className="btn btn-secondary" onClick={handleReset}>
                  Cancel
                </button>
                <button className="btn mr-0" onClick={handleSubmit}>
                  Save
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
