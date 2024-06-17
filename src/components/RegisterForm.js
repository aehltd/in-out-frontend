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
      <h2 className="block text-lg font-bold mb-4">Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={onRegisterSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input type="text" id="name"
            className="mt-1 px-3 py-2 block w-full placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm shadow-sm border border-gray-400
            focus:outline-none focus:ring-1
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            value={name} onChange={handleNameChange} required
          />
        </div>
        <div className="mt-4">
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
        <div className="mt-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm Password</label>
          <input type="password" id="confirm-password"
            className="mt-1 px-3 py-2 block w-full placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm shadow-sm border border-gray-400
            focus:outline-none focus:ring-1
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            value={confirmPassword} onChange={handleConfirmPasswordChange} required
          />
        </div>
        <div className="mt-5 flex space-x-4 justify-between">
          <span className="text-sm font-medium self-end ">
            Have an account? <Link to="/login" className="text-sky-500 underline">Back to login</Link>
          </span>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded items-center"
            type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
