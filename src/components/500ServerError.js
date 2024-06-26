import React from "react";
import { Link } from "react-router-dom";

const ServerErrorPage = () => {
  return (
    <div>
      <h1>500 - Server Error</h1>
      <p>Oops, something went wrong. Please try again later.</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default ServerErrorPage;
