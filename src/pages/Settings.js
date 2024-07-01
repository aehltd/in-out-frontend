import React from "react";
import { useNavigate } from "react-router";
import { ChangePassword, UserInfo } from "../components/UserSettings";

const SettingsPage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const handleNavToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container max-w-sm">
        <h1>User: {name}</h1>
        <UserInfo />
        <ChangePassword />
        <div className="mt-6 inline-flex w-full justify-between">
          <button className="btn btn-secondary ml-0" onClick={handleNavToHome}>
            Back to home
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
