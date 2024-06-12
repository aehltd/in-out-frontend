import React from "react";
import useLogin from "../hooks/useLogin";

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
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={onLoginSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={handlePasswordChange}
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

export default LoginForm;
