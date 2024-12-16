import React, { useState } from 'react';
import logoforloginpage from '../../assest/logoforloginpage.PNG';
import login from '../../assest/login.PNG';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function DoctorRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    retypePassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters long.';
    }
    if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form.',
        severity: 'error',
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://mental-health-assistant-backend.onrender.com'}/api/doctor/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: 'Account created successfully! Redirecting...',
          severity: 'success',
        });
        localStorage.setItem('accessToken', data.accessToken);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: data || 'Signup failed. Please try again.',
          severity: 'error',
        });
      }
    } catch (error) {
      setIsLoading(false);
      setSnackbar({
        open: true,
        message: 'An error occurred while signing up. Please try again later.',
        severity: 'error',
      });
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <img
          src={logoforloginpage}
          alt="Inner Peace Logo"
          className="signin-logo"
          onClick={() => navigate('/')}
        />
        <h1 className="welcome-text">Create Account</h1>
        <p className="subtext">Please fill in your details</p>

        <form className="signin-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Full Name"
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Email address"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Password"
                className={errors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="retypePassword">Confirm Password</label>
            <div className="password-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="retypePassword"
                name="retypePassword"
                value={formData.retypePassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm Password"
                className={errors.retypePassword ? 'input-error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.retypePassword && <p className="error-text">{errors.retypePassword}</p>}
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner"></div> : 'Sign Up'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/doctor/login">Login</Link>
        </p>
      </div>

      <div className="signin-right">
        <div className="illustration-container">
          <img src={login} alt="Illustration" />
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DoctorRegister;
