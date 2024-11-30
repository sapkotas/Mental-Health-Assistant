import React, { useState, useEffect } from 'react';
import './Login.css';
import logoforloginpage from '../assest/logoforloginpage.PNG';
import login from '../assest/login.PNG';
import hide from '../assest/hide.png';
import view from '../assest/view.png';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(''); // General form error

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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear field-specific error on typing
    setFormError(''); // Clear general error on typing
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setFormError('');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://mental-health-assistant-backend.onrender.com'}/api/users/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (data.status === 'success') {
        localStorage.setItem('isLoggedIn', 'true');
        const redirectTo = localStorage.getItem('redirectPath') || '/';
        navigate(redirectTo);
      } else if (data.errors) {
        setErrors(data.errors); // Set field-specific errors from the response
      } else {
        setFormError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setIsLoading(false);
      setFormError('An error occurred while logging in. Please try again.');
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
          {/* General form error */}
          {formError && <p className="form-error">{formError}</p>}
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
            <div className="password-input-container">
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
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <img src={view} alt="view" style={{ height: '22px', width: '20px' ,}} className='eye-button'/>
                ) : (
                  <img src={hide} alt="hide" style={{ height: '22px', width: '20px' }} className='eye-button'/>
                )}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="options">
            <div>
              <input type="checkbox" id="remember" onChange={handleRememberMe} />
              <label htmlFor="remember">Remember me</label>
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
      <div className="login-right">
        <div className="illustration-container">
          <img src={login} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;
