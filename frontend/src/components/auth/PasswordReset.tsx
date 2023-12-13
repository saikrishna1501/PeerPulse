// PasswordResetForm.js

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Button, Container, TextField, Typography } from "@mui/material";
import { apiCallForPasswordReset } from "../../store/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const PasswordResetForm = () => {

const location = useLocation();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(""); // New state for token

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form data, perform necessary actions, and call onPasswordSubmit
    dispatch(apiCallForPasswordReset(email, newPassword, token));
    toast.success('Your Password Reset is successful', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const extractedToken = searchParams.get("token");
    const id = searchParams.get("id");

    // Set the email state with the extracted id
    setEmail(id || "");
    // Set the token state
    setToken(extractedToken || "");
  }, [location.search]);

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PasswordResetForm;
