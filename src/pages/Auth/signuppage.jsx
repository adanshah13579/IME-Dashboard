import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for redirection
import Cookies from 'js-cookie'; // To store token in cookies if needed
import { baseuri } from '../../baseuri/baseuri';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear error message
    setError('');

    try {
      const response = await axios.post(`${baseuri}/api/auth/register`, {
        name,
        email,
        password,
        role: 'doctor', // The role is always 'doctor'
        specialization,
      });

      if (response.status === 201) {
        // Successful registration
        // Store token in cookies if the backend sends one
        Cookies.set('token', response.data.token, { expires: 7, path: '/' });
        
        // Redirect to login or dashboard
        navigate('/signin'); // Or redirect to a dashboard
      }
    } catch (err) {
      setError('Error: Could not register. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
        <Typography variant="h5">Sign Up</Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 2 }}>
          <TextField
            label="Full Name"
            type="text"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Specialization"
            type="text"
            fullWidth
            margin="normal"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
          
          {error && <Typography color="error">{error}</Typography>}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Sign Up
          </Button>
        </form>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Button onClick={() => navigate('/signin')} variant="body2">
              Login here
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
