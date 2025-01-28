import React, { useState, useEffect } from 'react';
import './Login.css';
import logoforloginpage from '../../assest/logoforloginpage.PNG';
import login from '../../assest/login.PNG';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icons from react-icons
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // "error" or "success"

  useEffect(() => {
    setFormData({
      email: localStorage.getItem('rememberedEmail') || '',
      password: localStorage.getItem('rememberedPassword') || '',
    });
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setFormError('');
  };

  const handleRememberMe = (e) => {
    if (e.target.checked) {
      localStorage.setItem('rememberedEmail', formData.email);
      localStorage.setItem('rememberedPassword', formData.password);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setFormError('');
  
    const emailPattern = /^[a-zA-Z]+\d+@gmail\.com$/;
    const newErrors = {};
  
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = 'Email must be in the format abc12@gmail.com.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
  
    const controller = new AbortController();
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://mental-health-assistant-backend.onrender.com'}/api/users/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          signal: controller.signal,
        }
      );
      
    
      if (!response.ok) {
        const errorData = await response.json();
        setFormError(errorData.message || 'Login failed. Please try again.');
        setSnackbarMessage(errorData.message || 'Login failed. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } else {
        const data = await response.json();
        if (data.status === 'success') {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('role', 'user');
          const redirectTo = localStorage.getItem('redirectPath') || '/';
          setSnackbarMessage('Login successful!');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setTimeout(() => navigate(redirectTo), 2000);
        } else {
          setFormError(data.message || 'Login failed. Please check your credentials.');
          setSnackbarMessage(data.message || 'Login failed. Please check your credentials.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setFormError('Request timed out. Please try again later.');
        setSnackbarMessage('Request timed out. Please try again later.');
      } else {
        setFormError('An error occurred while logging in. Please try again.');
        setSnackbarMessage('An error occurred while logging in. Please try again.');
      }
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src={logoforloginpage}
          alt="Inner Peace Logo"
          className="login-logo"
          onClick={() => navigate('/')}
        />
        <h1 className="welcome-text">Welcome back</h1>
        <p className="subtext">Please enter your details</p>
        <form className="login-form" onSubmit={handleLogin}>
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
          <div className="options">
            {/* <div>
              <input type="checkbox" id="remember" onChange={handleRememberMe} />
              <label htmlFor="remember">Remembe</label>
            </div> */}
          </div>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p className="signup-link">
           are you a doctor? <Link to="/doctor/login">login</Link>
        </p>
      </div>
      <div className="login-right">
        <div className="illustration-container">
          <img src={login} alt="Illustration" />
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;

