import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { baseuri } from '../../baseuri/baseuri';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${baseuri}/api/auth/register`, {
        name,
        email,
        password,
        role: 'doctor',
        specialization,
      });

      if (response.status === 201) {
        Cookies.set('token', response.data.token, { expires: 7, path: '/' });
        navigate('/signin');
      }
    } catch (err) {
      setError('Error: Could not register. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 4, fontWeight: 600 }}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Full Name"
            type="text"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Specialization"
            type="text"
            fullWidth
            margin="normal"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              padding: '12px 0',
              fontWeight: 'bold',
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#3f51b5", // Darken on hover
              },
            }}
          >
            Sign Up
          </Button>
        </form>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Button onClick={() => navigate('/signin')} variant="body2" sx={{ fontWeight: 'bold' }}>
              Login here
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
