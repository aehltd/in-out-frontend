import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    //Set local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("role", data.role);

    alert("Login successful");
    //Navigate to home page
    if (data.role === "admin") {
      navigate("/admin");
    } else navigate("/");
  };

  return (
    <LoginForm onLogin={handleLogin} />
  );
};

export default LoginPage;
