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
import ContactUs from './Pages/Contact/ContactUs';
import Dashboard from './Dashboard/Dashboard';
const App = () => {
  return (
    <>

    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/check_your_condition" element={
           <ProtectedRoute>
           <Predict />
         </ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/register/:role" element={<SignUp />} />

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
