import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AlertProvider } from './contexts/AlertContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </StrictMode>
);
