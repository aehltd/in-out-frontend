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
import NewNotificationPage from "./pages/Admin/CreateNotification";

const App = () => {
  return (
    <Router>
      <div className="flex items-center justify-center h-screen bg-gray-200"> 
        <div className="max-w-md max-y-md w-5/6 mx-auto my-auto bg-white shadow px-5 py-5 rounded-lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/attendance' element={<UserAttendancePage/>} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users/:id" element={<AdminUserPage />} />
            <Route path="/admin/attendance/:id" element={<AdminUserAttendancePage />} />
            <Route path="/admin/KPI/:id" element={<AdminUserKPIPage />} />
            <Route path="/admin/new-notification" element={<NewNotificationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            <Route path="/404-page-not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
// <Route component={NotFoundPage} />

export default App;
