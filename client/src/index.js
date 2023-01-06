import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // In a real application I would remove the <React.StrictMode> component to avoid rendering twice.
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
