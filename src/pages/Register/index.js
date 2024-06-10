import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = (data) => {
        //Set local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("role", data.role);
        
        alert("Registration successful");
        //Navigate to home page
        if(data.role === "admin") {
            navigate("/admin");
        } else navigate("/");
    };

    return (
        <div className="register-page">
            <RegisterForm onRegister={handleRegister} />
            <Link to="/login">Back to login</Link>
        </div>
    );
};

export default RegisterPage;