import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/register', userData);
      console.log('Registration successful', response.data);
      // redirect need to be added
    } catch (error) {
      console.error('Error in registration', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} placeholder="First Name" />
      <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Last Name" />
      <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
