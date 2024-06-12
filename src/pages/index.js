import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { emptyCache } from "../utils/cache";

const HomePage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  console.log(token, name, role);

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin");
    }
  }, [role, navigate]);

  let homeContent;
  let accountNav; //links to login/register if no token, logout if token

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    emptyCache();
    navigate("/login");
  };

  if (token) {
    //Logged in
    homeContent = (
      <div>
        <h2>Welcome, {name}!</h2>
      </div>
    );
    accountNav = (
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    accountNav = (
      <div>
        <p>
          <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Home Page</h1>
      {homeContent}
      {accountNav}
    </div>
  );
};

export default HomePage;
