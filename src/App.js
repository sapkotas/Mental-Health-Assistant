import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './UserPortal/Pages/Home/Home';
import { NotFound } from './UserPortal/Component/NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute';

// User Components
import { Predict } from './UserPortal/Component/Predict/Predict';
import Login from './UserPortal/Authentication/Login';
import SignUp from './UserPortal/Authentication/SignUp';
import { Profile } from './UserPortal/Pages/Profile/Profile';
import { History } from './UserPortal/Pages/History/History';
import { Journal } from './UserPortal/Pages/Journal/Journal';
import Dashboard from './UserPortal/Dashboard/Dashboard';
import { Doctor } from './UserPortal/Pages/Doctor/Doctor';

// Doctor Components
import DoctorLogin from './DoctorPortal/Login/DoctorLogin';
import DoctorRegister from './DoctorPortal/Register/DoctorRegister';
import DoctorMain from './DoctorPortal/DoctorSidebar/DoctorMain'; 
import DoctorDahboard from './DoctorPortal/DoctorDashboard/DoctorDahboard';
import { DoctorUser } from './DoctorPortal/DoctorUser/DoctorUser';

// Admin Components
import AdminDashboard from './Admin/Dashboard/AdminDashboard';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import VerifyDoctor from './Admin/VerifyDoctor/VerifyDoctor';
import { AdminUsers } from './Admin/Users/AdminUsers';
import DoctorDetails from './UserPortal/DoctorDetails/DoctorDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />

        {/* Doctor-Specific Routes */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute doctorOnly={true}>
              <DoctorDahboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctorUsers"
          element={
            <ProtectedRoute doctorOnly={true}>
              <DoctorUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctorProfile"
          element={
            <ProtectedRoute doctorOnly={true}>
              <DoctorMain />
            </ProtectedRoute>
          }
        />

        {/* User-Specific Routes */}
        <Route
          path="/check_your_condition"
          element={
            <ProtectedRoute userOnly={true}>
              <Predict />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute userOnly={true}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute userOnly={true}>
              <History />
            </ProtectedRoute>
          }
        />  
        <Route
          path="/doctor"
          element={
            <ProtectedRoute userOnly={true}>
              <Doctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-details"
          element={
            <ProtectedRoute userOnly={true}>
              <DoctorDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/overview/dashboard"
          element={
            <ProtectedRoute userOnly={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute userOnly={true}>
              <Journal />
            </ProtectedRoute>
          }
        />

        {/* Admin-Specific Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/User"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctor"
          element={
            <ProtectedRoute adminOnly={true}>
              <VerifyDoctor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
