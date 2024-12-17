import React, { useState } from 'react';
import './SignUp.css';
import logoforloginpage from '../../assest/logoforloginpage.PNG';
import login from '../../assest/login.PNG';
import { Link, useNavigate} from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; // Material-UI for Snackbar and Alert components

function SignUp() {
  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    retypePassword: '',
    role: 'user',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // success, error, warning, info
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
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z]+[0-9]*@gmail\.com$/;
  
    const passwordMinLength = 8;
  
    if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = 'Full name should only contain letters and spaces.';
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email should contain name followed by numbers.';
    }
    if (formData.password.length < passwordMinLength) {
      newErrors.password = `Password must be at least ${passwordMinLength} characters long.`;
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
        `${process.env.REACT_APP_API_URL || 'https://mental-health-assistant-backend.onrender.com'}/api/users/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        }
      );
  
      const data = await response.json();
      setIsLoading(false);
  
      if (data.status === 'User registered successfully !!') {
        setSnackbar({
          open: true,
          message: 'Account created successfully! Redirecting...',
          severity: 'success',
        });
        setTimeout(() => {
          navigate('/login'); // Redirect to the login page
        }, 3000);
      } else if (data.errors) {
        setErrors(data.errors);
        setSnackbar({
          open: true,
          message: 'Error in form submission. Please check your details.',
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: data.message || 'Signup failed. Please try again.',
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
          Already have an account? <Link to="/login">Login</Link>
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

export default SignUp;
