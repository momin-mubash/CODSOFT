import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  console.log('Header component rendered');

  return (
    <header className="header">
      <h1>Bloggy</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>



      </nav>
    </header>
  );
};

export default Header;
