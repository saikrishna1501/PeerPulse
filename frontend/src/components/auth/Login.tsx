import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiCallForLogin } from "../../store/auth";

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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
