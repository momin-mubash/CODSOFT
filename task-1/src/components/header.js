import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import header styles if needed

const Header = () => (
  <header className="header">
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Portfolio</Link> {/* Different font style for "portfoli" */}
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
