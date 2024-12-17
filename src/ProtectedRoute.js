import React from 'react';
import { Navigate } from 'react-router-dom';

const getRole = () => {
  // Fetch the current role from localStorage: 'doctor', 'admin', or 'user'
  return localStorage.getItem('role');
};

const ProtectedRoute = ({ children, doctorOnly = false, adminOnly = false, userOnly = false }) => {
  const role = getRole();

  // Check for doctor-only routes
  if (doctorOnly && role !== 'doctor') {
    return <Navigate to="/doctor/login" replace />;
  }

  // Check for admin-only routes
  if (adminOnly && role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  // Check for user-only routes
  if (userOnly && role !== 'user') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
