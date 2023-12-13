import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };
  const initialErrorState = {
    emailError: '',
    firstNameError: '',
    lastNameError: '',
    passwordError: ''
  };

  const [userData, setUserData] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState(initialErrorState);

  const validate = () => {
    let errors = {...initialErrorState};
    let isValid = true;

    // Email validation
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.emailError = 'Invalid email format';
      isValid = false;
    }

    // First and last name validation
    if (!userData.firstName.trim()) {
      errors.firstNameError = 'First name is required';
      isValid = false;
    }
    if (!userData.lastName.trim()) {
      errors.lastNameError = 'Last name is required';
      isValid = false;
    }

    // Password validation
    if (userData.password.length < 5) {
      errors.passwordError = 'Password must be at least 5 characters';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:5000/users', userData);
      toast.success('Registration successful! Please verify the email id', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      // console.log('Registration successful', response.data);
      setUserData(initialState);
      // Redirect logic here
    } catch (error) {
      toast.error('Registration failed. Please try again', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Register</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            error={!!validationErrors.emailError}
            helperText={validationErrors.emailError}
            variant="outlined" margin="normal" required fullWidth
            id="email" label="Email Address" name="email" autoComplete="email"
            autoFocus value={userData.email} onChange={handleChange}
          />
          <TextField
            error={!!validationErrors.firstNameError}
            helperText={validationErrors.firstNameError}
            variant="outlined" margin="normal" required fullWidth
            id="firstName" label="First Name" name="firstName"
            value={userData.firstName} onChange={handleChange}
          />
          <TextField
            error={!!validationErrors.lastNameError}
            helperText={validationErrors.lastNameError}
            variant="outlined" margin="normal" required fullWidth
            id="lastName" label="Last Name" name="lastName"
            value={userData.lastName} onChange={handleChange}
          />
          <TextField
            error={!!validationErrors.passwordError}
            helperText={validationErrors.passwordError}
            type="password" name="password" value={userData.password}
            onChange={handleChange} label="Password" variant="outlined"
            fullWidth margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Register</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;