import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/register">Register</Link></p>
        </div>
    )
}

export default HomePage;