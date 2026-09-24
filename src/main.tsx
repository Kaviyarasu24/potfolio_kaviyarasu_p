import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import clarity from '@microsoft/clarity';
import App from './App';
import './index.css';

// Defer analytics initialization to avoid blocking critical render path & TBT
if (typeof window !== 'undefined') {
  const initClarity = () => clarity.init('y3nxnckin2');
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(initClarity, { timeout: 3000 });
  } else {
    setTimeout(initClarity, 1500);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

