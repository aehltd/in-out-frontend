import React /**, { StrictMode }*/ from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/index";
import UserAttendancePage from "./pages/User/Attendance";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AdminPage from "./pages/Admin";
import AdminUserPage from "./pages/Admin/UserPage";
import AccessDeniedPage from "./components/403AccessDenied";
import NotFoundPage from "./components/404NotFound";
import SettingsPage from "./pages/Settings";
import PasswordResetPage from "./pages/ForgotPassword";

const App = () => {
  return (
    // <StrictMode>
    <Router>
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/attendance" element={<UserAttendancePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users/:id" element={<AdminUserPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/forgot-password" element={<PasswordResetPage />} />

          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route path="/404-page-not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
    // </StrictMode>
  );
};
// <Route component={NotFoundPage} />

export default App;
