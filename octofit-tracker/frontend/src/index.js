

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Optionally log the codespace name for debugging
console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals();
