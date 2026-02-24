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
import  History  from './UserPortal/Pages/History/History';
import  Journal  from './UserPortal/Pages/Journal/Journal';
import Dashboard from './UserPortal/Dashboard/Dashboard';
import { Doctor } from './UserPortal/Pages/Doctor/Doctor';

// Doctor Components
import DoctorLogin from './DoctorPortal/Login/DoctorLogin';
import DoctorRegister from './DoctorPortal/Register/DoctorRegister';
import DoctorDahboard from './DoctorPortal/DoctorDashboard/DoctorDahboard';
import { DoctorProfile } from './DoctorPortal/Upload/DoctorProfile';


// Admin Components
import AdminDashboard from './Admin/Dashboard/AdminDashboard';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import VerifyDoctor from './Admin/VerifyDoctor/VerifyDoctor';
import { AdminUsers } from './Admin/Users/AdminUsers';
import DoctorDetails from './UserPortal/DoctorDetails/DoctorDetails';
import ChatPage from './UserPortal/Component/Chat/Chatpage';
import EsewaPayment from './UserPortal/Payment/EsewaPayment';
import ChatList from './UserPortal/Component/Chat/ChatList';
import DoctorChatPage from './DoctorPortal/Doctorchat/DoctorChatPage';
import PaymentSuccess from './UserPortal/Payment/PaymentSucess';
import PaymentFailure from './UserPortal/Payment/PaymentFailure';
import DoctorHistory from './DoctorPortal/History/DoctorHistory';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<EsewaPayment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/doctor-details" element={<DoctorDetails />} />
        <Route path="/chat" element={<ChatPage />} /> 
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />

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
          path="/doctorchatlist"
          element={
            <ProtectedRoute doctorOnly={true}>
              <DoctorChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctorchat"
          element={
            <ProtectedRoute doctorOnly={true}>
              <DoctorChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctorProfile"
          element={
            <ProtectedRoute doctorOnly={true}>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctorhistory"
          element={
            <ProtectedRoute doctorOnly={true}>
              <DoctorHistory />
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

export default App; a