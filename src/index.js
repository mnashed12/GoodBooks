// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App'; // Import your root component

// Use createRoot to render your root component
createRoot(document.getElementById('root')).render(<App />);
