import React, { useState } from 'react';
import './SignUp.css';
import logoforloginpage from '../assest/logoforloginpage.PNG';
import login from '../assest/login.PNG';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons from react-icons

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();

  const determineRole = () => {
    if (location.pathname.includes('/register/doctor')) return 'doctor';
    if (location.pathname.includes('/register/admin')) return 'admin';
    return 'user';
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    retypePassword: '',
    role: determineRole(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setFormError('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setFormError('');

    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z]+[0-9]+\d+@gmail\.com$/;
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
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userRole', formData.role);

        formData.role === 'doctor'
          ? navigate('/overview/dashboard')
          : navigate('/');
      } else if (data.errors) {
        setErrors(data.errors);
      } else {
        setFormError(data.message || 'Signup failed. Please check your details.');
      }
    } catch (error) {
      setIsLoading(false);
      setFormError('An error occurred while signing up. Please try again.');
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

        <form className="signin-form" onSubmit={handleSignIn}>
          {formError && <p className="form-error">{formError}</p>}

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
                {showPassword ? <FaEye />:   <FaEyeSlash />}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="retypePassword">Re-type Password</label>
            <div className="password-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="retypePassword"
                name="retypePassword"
                value={formData.retypePassword}
                onChange={handleInputChange}
                required
                placeholder="Re-type Password"
                className={errors.retypePassword ? 'input-error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword   ? <FaEye />:   <FaEyeSlash />}
              </button>
            </div>
            {errors.retypePassword && <p className="error-text">{errors.retypePassword}</p>}
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner"></div> : 'Sign Up'}
          </button>
        </form>

        {isLoading && <p className="loading-text">Please wait... We are processing your request.</p>}

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <div className="signin-right">
        <div className="illustration-container">
          <img src={login} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
