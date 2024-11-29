import React, { useState } from 'react';
import './SignIn.css';
import logoforloginpage from '../assest/logoforloginpage.PNG';
import login from '../assest/login.PNG';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', role: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

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
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://mental-health-assistant-backend.onrender.com'}/api/users/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
  
      const data = await response.json();
      setIsLoading(false);
  
      if (data.status === 'User registered sucessfully !!') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email); 
        localStorage.setItem('userRole', formData.role);
        navigate('/');
      } else if (data.errors) {
        setErrors(data.errors);
      } else {
        setFormError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setIsLoading(false);
      setFormError('An error occurred while logging in. Please try again.');
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
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className={errors.role ? 'input-error' : ''}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="doc">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="error-text">{errors.role}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
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
    </div>
  );
}

export default SignIn;
