import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import App_login from './App_Login.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App_login />
  </StrictMode>
);
