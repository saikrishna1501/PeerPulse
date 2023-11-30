import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerification: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.post('http://localhost:5000/users/verify-email', { token });
        console.log('Email verified successfully');
        // Redirect or update UI action required
      } catch (error) {
        console.error('Error verifying email', error);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return <div>Email verification in progress...</div>;
};

export default EmailVerification;