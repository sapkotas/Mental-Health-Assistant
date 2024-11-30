import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import error404 from '../../assest/error404.jpg';

export const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="not-found">
      <div className="not-found-content">
        <img src={error404} alt="not found" className="not-foundimg" />
        <p>Redirecting to the home page in {countdown} second{countdown > 1 ? 's' : ''}...</p>
        <button className="" onClick={() => navigate('/')}>Go to Home Now</button>
      </div>
    </div>
  );
};
