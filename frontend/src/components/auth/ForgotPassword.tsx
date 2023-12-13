
import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { apiCallForForgotPassword, forgotPasswordMessage } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword: React.FC = () => {
  // Selector for checking if the user is authenticated
  let isEmailSent =  useSelector(
    (state: any) => state.auth.isEmailSent
  );  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement logic to handle the email submission for password reset
    dispatch(apiCallForForgotPassword(email));
    //navigate('/');
  };

  useEffect(() => {
    // Clear the password reset message on component unmount or page refresh
    console.log("hi")
    return () => {
      dispatch(forgotPasswordMessage(null as string | null));
    };
  }, []);
  

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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
      <div>
      {isEmailSent}
      </div>
    </Container>
  );
};

export default ResetPassword;
