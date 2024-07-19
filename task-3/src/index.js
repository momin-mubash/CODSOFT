import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root')); // Use createRoot for rendering

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
