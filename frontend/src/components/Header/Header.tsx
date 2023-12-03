// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Link to="/users/auth">Login</Link>
      <Link to="/users/register">Signup</Link>
    </header>
  );
};

export default Header;