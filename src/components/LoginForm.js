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
      <h2 className="block text-lg font-bold mb-4">Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={onLoginSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <div className="mt-1">
            <input type="email" id="email"
              className="px-3 py-2 block w-full placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm shadow-sm border border-gray-400
              focus:outline-none focus:ring-1
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              value={email} onChange={handleEmailChange} required
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input type="password" id="password"
            className="mt-1 px-3 py-2 block w-full placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm shadow-sm border border-gray-400
            focus:outline-none focus:ring-1
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            value={password} onChange={handlePasswordChange} required
          />
        </div>
        <div className="mt-5 flex space-x-4 justify-between">
          <span className="text-sm font-medium self-end ">
            Don't have an account? <Link to="/register" className="text-sky-500 underline">Register here</Link>
          </span>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded items-center"
            type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
