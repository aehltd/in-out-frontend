import React from "react";
import { Link, useNavigate } from "react-router-dom";
import usePasswordReset from "../hooks/usePasswordReset";

const PasswordResetPage = () => {
  const { submitted, email, error, handleEmailChange, handleSubmit } =
    usePasswordReset();

  return submitted ? (
    <SubmittedPage />
  ) : (
    <div className="container max-w-md">
      <h1 className="text-lg font-bold mb-4">Reset Password</h1>
      <p>Please enter your email below to reset your password:</p>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          id="email"
          className="input-field"
          value={email}
          onChange={handleEmailChange}
          placeholder="john.doe@example.com"
          autoComplete="email"
        />
        <div className="flex justify-between items-end">
          <Link
            to="/login"
            className="text-sm font-medium text-sky-500 underline"
          >
            Back to login...
          </Link>
          <button type="submit" className="btn btn-primary ml-auto mb-0 mt-4">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

const SubmittedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md">
      <h1 className="text-lg font-bold mb-4">Password Reset Submitted</h1>
      <p>
        Your password reset request has been submitted. If your account exists,
        you will receive an email with further instructions on resetting your
        password.
      </p>
      <div className="flex justify-end">
        <button
          className="btn btn-primary mb-0 mt-4"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
