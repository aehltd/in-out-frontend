import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        navigate("/");
    };

    return (
        <div className="register-page">
            <RegisterForm onRegister={handleRegister} />
        </div>
    );
};

export default RegisterPage;