import React from "react";
import useRegister from "../hooks/useRegister";
import { Link } from "react-router-dom";

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
      <div className="flex items-baseline justify-between mb-4">
        <span className="block text-lg font-bold">Register</span>
        <span className="text-sm font-medium text-red-500 text-end">
          {error && <p>{error}</p>}
        </span>
      </div>
      <form onSubmit={onRegisterSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="input-field"
            value={name}
            onChange={handleNameChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={handleEmailChange}
              placeholder="john.doe@example.com"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="input-field"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <div className="mt-5 flex space-x-4 justify-between">
          <span className="text-sm font-medium self-end ">
            Have an account already?{" "}
            <Link to="/login" className="text-sky-500 underline">
              Log in
            </Link>
          </span>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
