import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './styles/theme.css';
import { AuthProvider } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AIProvider } from './contexts/AIContext';
import { PaymentProvider } from './contexts/PaymentContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CurrencyProvider>
        <AIProvider>
          <PaymentProvider>
            <App />
          </PaymentProvider>
        </AIProvider>
      </CurrencyProvider>
    </AuthProvider>
  </StrictMode>
);