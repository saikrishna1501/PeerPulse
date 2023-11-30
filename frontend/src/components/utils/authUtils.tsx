// authUtils.ts
import axios from 'axios';

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    // Calling API endpoint for checking authentication
    const response = await axios.get('http://localhost:5000/users/auth-check', { withCredentials: true });
    console.log(response)
    //backend sends a response indicating whether the user is authenticated
    return response.data.isAuthenticated;
  } catch (error) {
    console.error('Auth check failed', error);
    return false;
  }
};