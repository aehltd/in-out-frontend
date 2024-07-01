import { useState } from "react";
import { confirmCurrentPassword, changePassword } from "../api/authAPI";

const usePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCurrentChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (currentPassword === "") {
      setError("Please enter your current password.");
      setLoading(false);
      return;
    }
    if (newPassword === "") {
      setError("Please enter your new password.");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const data = { currentPassword, newPassword, confirmPassword };
      console.log(data);
      console.log("Checking current password:");
      const currentCheck = await confirmCurrentPassword(currentPassword);
      console.log("Current password:", currentCheck.password);
      const newCheck = await changePassword(newPassword);
      setLoading(false);
      return newCheck.msg;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return null; // Return null or handle error as needed
    }
  };

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    error,
    loading,
    handleCurrentChange,
    handleNewChange,
    handleConfirmChange,
    handleSubmit,
  };
};

export default usePassword;
