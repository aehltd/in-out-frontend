import React from "react";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();

  const onLoginSubmit = async (e) => {
    const data = await handleSubmit(e);
    if (data) {
      onLogin(data);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <span className="block text-lg font-bold">Login</span>
        <span className="text-sm font-medium text-red-500 text-end">
          {error && <p>{error}</p>}
        </span>
      </div>
      <form onSubmit={onLoginSubmit}>
        <div>
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
          />
        </div>
        <div className="mt-5 flex space-x-4 justify-between">
          <span className="text-sm font-medium self-end ">
            Don't have an account?{" "}
            <Link to="/register" className="text-sky-500 underline">
              Register here
            </Link>
          </span>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg items-center"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
