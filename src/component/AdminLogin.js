import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import VideoBg from '../video/admin.mp4';
import { TextField, Box, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../styles/overall.css';
import AdminIndex from '../pages/AdminIndex';

const AdminLogin = () => {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const getEmail = localStorage.getItem('emailData');
  const getName = localStorage.getItem('nameData');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const actualData = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    if (actualData.email && actualData.password) {
      if (
        (actualData.email.toLowerCase() === 'aravindkumar@gmail.com' &&
          actualData.password === 'Aravind123@') ||
        (actualData.email.toLowerCase() === 'admin@gmail.com' &&
          actualData.password === 'Lucky123@')
      ) {
        if (actualData.email.toLowerCase() === 'aravindkumar@gmail.com') {
          localStorage.setItem('emailData', 'aravindkumar@gmail.com');
          localStorage.setItem('nameData', 'Bobba Aravindkumar');
        } else {
          localStorage.setItem('emailData', 'admin@gmail.com');
          localStorage.setItem('nameData', 'Vivak Sudarshan');
        }
        setError(false);
        document.getElementById('login-form').reset();
        navigate('/admin-index');
      } else {
        setError(true);
      }
    } else {
      console.log('All fields are required');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {getEmail && getName ? (
        <AdminIndex />
      ) : (
        <>
          <Navbar />
          <div className='main'>
            <video src={VideoBg} autoPlay loop muted />
            <div className='contentt'>
              <div className='loginBox'>
                <div className='avatar-container'>
                  <img src={'capstone.png'} className='avatar' alt='Avatar' />
                </div>
                <h1>Admin Login</h1>
                <Box component='form' className='form' noValidate sx={{ mt: 3, ml: 3, mr: 3 }} id='login-form' onSubmit={handleSubmit}>
                  <label>Email Address</label>
                  <TextField className='inputs' margin='normal' required fullWidth id='email' name='email' label='Email Address' type='email' />
                  <label>Password</label>
                  <TextField
                    className='inputs'
                    margin='normal'
                    required
                    fullWidth
                    id='password'
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'} // Show/hide password based on state
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={handleTogglePassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Box textAlign='center'>
                    <Button type='submit' variant='contained' sx={{ mt: 3 }}>
                      Login
                    </Button>
                  </Box>
                  {error && (
                    <Box textAlign='center' sx={{ mt: 2, color: 'red' }}>
                      Incorrect email or password!
                    </Box>
                  )}
                </Box>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminLogin;
