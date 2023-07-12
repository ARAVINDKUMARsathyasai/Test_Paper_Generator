import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Box } from '@mui/material';
import '../styles/userLogin.css';

const UserLogin = () => {
  const navigate = useNavigate();
  
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.ok) {
        const data = await response.json();

        if (data.checked) {
          setUserId(data.id);
          localStorage.setItem('userId', data.id);
          console.log(data);
          navigate('/userIndex');
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      navigate('/userIndex');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className='contentBody'>
        <div className='containerr'>
          <div className='login-box'>
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
              <div className='input-box'>
                <input
                  type='email'
                  required
                  value={email}
                  name='email'
                  onChange={handleEmailChange}
                />
                <label className={email ? 'active' : ''}>Email</label>
              </div>
              <div className='checkbox-container'>
                <label htmlFor='showPasswordCheckbox' style={{ color: 'white', paddingRight: '5px',marginLeft:'52%' }}>
                  Show Password
                </label>
                <input
                  type='checkbox'
                  id='showPasswordCheckbox'
                  checked={showPassword}
                  onChange={handleTogglePassword}
                />
              </div>
              <div className='input-box' style={{marginTop:'-1px'}}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  name='password'
                  value={password}
                  onChange={handlePasswordChange}
                />
                <label className={password ? 'active' : ''}>Password</label>
              </div>
              <button type='submit' className='btnn'>
                Login
              </button>
              {error && (
                <Box textAlign='center' sx={{ mt: 2, color: 'red' }}>
                  Invalid User !! 
                </Box>
              )}
            </form>
          </div>
          {[...Array(51)].map((_, index) => (
            <span style={{ '--i': index }} key={index}></span>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserLogin;
