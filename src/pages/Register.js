import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (data) => {
    //Set local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("role", data.role);

    alert("Registration successful");
    //Navigate to home page
    if (data.role === "admin") {
      navigate("/admin");
    } else navigate("/");
  };

  return (
    <div className="container max-w-md">
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
