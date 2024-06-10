import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AdminPage from './pages/Admin';
import AccessDeniedPage from './pages/AccessDenied';
import NotFoundPage from './pages/PageNotFound';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
} 
// <Route component={NotFoundPage} />

export default App;
