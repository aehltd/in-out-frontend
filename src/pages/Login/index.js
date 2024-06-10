import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
    
  const handleLogin = (data) => {
    //Set local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("role", data.role);

    alert("Login successful");
    //Navigate to home page
    navigate("/");
  };

  return (
    <div className="login-page">
      <LoginForm onLogin={handleLogin} />
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div> 
  );
};

export default LoginPage;
