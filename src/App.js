import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { Predict } from './Component/Predict/Predict';
import Login from './Authentication/Login';
import  {Profile}  from './Pages/Profile/Profile';
import { Doctor } from './Pages/Doctor/Doctor';
import { History } from './Pages/History/History';
import ProtectedRoute from './ProtectedRoute';
import { Journal } from './Pages/Journal/Journal';
import SignUp from './Authentication/SignUp';
import { NotFound } from './Component/NotFound/NotFound';
import Dashboard from './Dashboard/Dashboard';
import DoctorRegister from './DoctorPortal/Register/DoctorRegister';
import DoctorLogin from './DoctorPortal/Login/DoctorLogin';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import AdminDashboard from './Admin/Dashboard/AdminDashboard';
import DoctorProfile from './DoctorPortal/DoctorProfile';
import  VerifyDoctor  from './Admin/VerifyDoctor/VerifyDoctor';
import  DoctorMain  from './DoctorPortal/DoctorSidebar/DoctorMain';
import KhaltiPayment from './Payment/Payment';
const App = () => {
  return (
    <>

    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/check_your_condition" element={
           <ProtectedRoute>
           <Predict />
         </ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/payment" element={<KhaltiPayment />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard/admin/doctor"
          element={
            <ProtectedRoute>
              <VerifyDoctor/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute>
              <DoctorMain />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <Doctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/overview/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />
      </Routes>
      </Router>
    </>
  );
};

export default App;
