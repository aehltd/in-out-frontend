import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/index";
import UserAttendancePage from "./pages/User/Attendance";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AdminPage from "./pages/Admin";
import AdminUserPage from "./pages/Admin/UserPage";
import AdminUserAttendancePage from "./pages/Admin/UserPage/Attendance";
import AdminUserKPIPage from "./pages/Admin/UserPage/KPI";
import AccessDeniedPage from "./components/403AccessDenied";
import NotFoundPage from "./components/404NotFound";

const App = () => {
  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen bg-gray-200"> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/attendance' element={<UserAttendancePage/>} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users/:id" element={<AdminUserPage />} />
            <Route path="/admin/attendance/:id" element={<AdminUserAttendancePage />} />
            <Route path="/admin/KPI/:id" element={<AdminUserKPIPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            <Route path="/404-page-not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </div>
    </Router>
  );
};
// <Route component={NotFoundPage} />

export default App;
