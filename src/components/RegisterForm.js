import React from "react";
import useRegister from "../hooks/useRegister";

const RegisterForm = ({ onRegister }) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    loading,
    error,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = useRegister();

  const onRegisterSubmit = async (e) => {
    const data = await handleSubmit(e);
    if (data) {
      onRegister(data);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      <form onSubmit={onRegisterSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            id="register-name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            id="register-confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
