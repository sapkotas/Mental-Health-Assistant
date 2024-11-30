import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Dashboard from './Dashboard/Dashboard';
import About from './Pages/About/About';
import { Predict } from './Component/Predict/Predict';
import Login from './Authentication/Login';
import  {Profile}  from './Pages/Profile/Profile';
import { Settings } from './Pages/Settings/Settings';
import { Doctor } from './Pages/Doctor/Doctor';
import { History } from './Pages/History/History';
import ProtectedRoute from './ProtectedRoute';
import { Journal } from './Pages/Journal/Journal';
import SignIn from './Authentication/SignIn';
import { NotFound } from './Component/NotFound/NotFound';
import TermsOfService from './Component/Service/TermsOfService';
import ContactUs from './Pages/Contact/ContactUs';
const App = () => {
  return (
    <>
    <BrowserRouter>
   
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<TermsOfService />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/check_your_condition" element={
           <ProtectedRoute>
           <Predict />
         </ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />

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
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
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
    </BrowserRouter>
    </>
  );
};

export default App;
