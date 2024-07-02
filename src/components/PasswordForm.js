import React from "react";
import usePassword from "../hooks/usePassword";

const PasswordForm = ({ onCancel, onSubmit }) => {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    error,
    loading,
    handleCurrentChange,
    handleNewChange,
    handleConfirmChange,
    handleSubmit,
  } = usePassword();

  const handleFormSubmit = async (e) => {
    const data = await handleSubmit(e);
    if (!data) return;
    onSubmit(data);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <span className="block text-lg font-bold">Change Password</span>
        <span className="text-sm font-medium text-red-500 text-end">
          {error && <p>{error}</p>}
        </span>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="text-sm w-full font-medium justify-between">
          <label htmlFor="current-password">Current Password</label>
          <input
            className="input-field"
            type="password"
            id="current-password"
            name="current-password"
            value={currentPassword}
            onChange={handleCurrentChange}
          />
        </div>
        <div className="mt-4 text-sm w-full font-medium justify-between">
          <label htmlFor="new-password">New Password</label>
          <input
            className="input-field"
            type="password"
            id="new-password"
            name="new-password"
            value={newPassword}
            onChange={handleNewChange}
          />
        </div>
        <div className="mt-4 text-sm w-full font-medium justify-between">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            className="input-field"
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmChange}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="btn mr-0" type="submit">
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
