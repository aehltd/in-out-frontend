import React, {useEffect} from "react";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import PasswordForm from "./PasswordForm";
import useUserData from "../hooks/useUserData";
import LoadingSpinner from "./LoadingSpinner";

const ChangePassword = () => {
  const { openModal, handleModalOpen, handleModalClose } = useModal();

  const handlePasswordCancel = () => {
    handleModalClose();
  };

  const handlePasswordSave = (message) => {
    console.table(message);
    handleModalClose();
  };

  return (
    <>
      <Modal isOpen={openModal} size="xs">
        <PasswordForm
          onCancel={handlePasswordCancel}
          onSubmit={handlePasswordSave}
        />
      </Modal>
      <div className="container container-inside mt-4">
        <label
          htmlFor="password"
          className="inline-flex text-sm w-full font-medium justify-between items-center"
        >
          Password
          <button className="btn btn-secondary" onClick={handleModalOpen}>
            Change Password
          </button>
        </label>
      </div>
    </>
  );
};

const UserInfo = ({id = null, children}) => {
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
  } = useUserData(id);

  useEffect(() => {
    if (id) {
        console.log(id)
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {id && <p>Name: {user.name}</p>}
      <p>ID: {user._id}</p>
      <p>Role: {user.role}</p>
      {children}
      <div className="container container-inside mt-4">
        <div>
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
        {id && (<div className="mt-4">
          <label
            htmlFor="role"
            className="inline-flex text-sm w-full font-medium justify-between"
          >
            Role
            <button
              id="role"
              className="text-green-500 hover:text-green-600"
              onClick={handleEnable}
            >
              Change
            </button>
          </label>
          <select
            id="role"
            className="input-field"
            value={user.role}
            onChange={handleChange}
            disabled={isDisabled.role}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>)}
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
        <div>
          <span className="flex justify-end mt-4">
            <button
              className="btn btn-secondary mr-4"
              onClick={handleReset}
              disabled={!isBeingEdited}
            >
              Cancel
            </button>
            <button
              className="btn"
              onClick={handleSubmit}
              disabled={!isBeingEdited}
            >
              Save
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export { ChangePassword, UserInfo };
