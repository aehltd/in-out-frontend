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

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const tokenParts = token.split('.')[1];
      const decodedToken = JSON.parse(atob(tokenParts));
      const exp = decodedToken.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      if (now > exp) { // Token has expired
        navigate("/login");
      }
    }
  })

  let homeContent;
  let accountNav; //links to login/register if no token, logout if token

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    emptyCache();
    navigate("/login");
  };

  homeContent = (
    <div>
      <h2>Welcome, {name}!</h2>
      <p><Link to="/attendance">My attendance</Link></p>
    </div>
  );
  accountNav = (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  return (
    <div>
      <h1>Home Page</h1>
      {homeContent}
      {accountNav}
    </div>
  );
};

export default HomePage;
