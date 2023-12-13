import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiCallForLogin } from "../../store/auth";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Selector for checking if the user is authenticated
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  // Event Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch login action
    const { email, password } = credentials;
    dispatch(apiCallForLogin(email, password));
  };

  // Effect to navigate on successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Link to="/users/forgotPassword" style={{ marginTop: '8px', textDecoration: 'none', color: 'primary' }}>
            Forgot Password?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
