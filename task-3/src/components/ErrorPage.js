import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h2>Access Denied</h2>
      <p>Sorry, you don't have permission to edit this blog.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default ErrorPage;
