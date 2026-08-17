import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import clarity from '@microsoft/clarity';
import App from './App';
import './index.css';

clarity.init('y3nxnckin2');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

