import React, { createContext, useContext, useState, useEffect } from 'react';

interface ExchangeRate {
  code: string;
  rate: number;
  symbol: string;
  name: string;
}

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  convertPrice: (amount: number, fromCurrency: string, toCurrency: string) => number;
  formatPrice: (amount: number, currency: string) => string;
  availableCurrencies: ExchangeRate[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { code: 'USD', rate: 1, symbol: '$', name: 'US Dollar' },
    { code: 'EUR', rate: 0.92, symbol: '€', name: 'Euro' },
    { code: 'GBP', rate: 0.79, symbol: '£', name: 'British Pound' },
    { code: 'JPY', rate: 150.59, symbol: '¥', name: 'Japanese Yen' },
    { code: 'AUD', rate: 1.52, symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', rate: 1.35, symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'CHF', rate: 0.90, symbol: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', rate: 7.23, symbol: '¥', name: 'Chinese Yuan' },
    { code: 'INR', rate: 83.12, symbol: '₹', name: 'Indian Rupee' },
    { code: 'BRL', rate: 5.04, symbol: 'R$', name: 'Brazilian Real' }
  ]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        // In production, fetch real exchange rates from an API
        // Example API endpoints:
        // - https://api.exchangerate-api.com
        // - https://api.currencyapi.com
        // - https://api.exchangeratesapi.io
        
        // For demo purposes, we're using static rates
        // Update rates every hour in production
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };

    fetchExchangeRates();
    const interval = setInterval(fetchExchangeRates, 3600000); // Update every hour

    return () => clearInterval(interval);
  }, []);

  const convertPrice = (amount: number, fromCurrency: string, toCurrency: string): number => {
    if (fromCurrency === toCurrency) return amount;
    
    const fromRate = exchangeRates.find(rate => rate.code === fromCurrency)?.rate || 1;
    const toRate = exchangeRates.find(rate => rate.code === toCurrency)?.rate || 1;
    
    // Convert to USD first, then to target currency
    const amountInUSD = amount / fromRate;
    return amountInUSD * toRate;
  };

  const formatPrice = (amount: number, currencyCode: string): string => {
    const currency = exchangeRates.find(rate => rate.code === currencyCode);
    if (!currency) return `$${amount.toFixed(2)}`;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      convertPrice,
      formatPrice,
      availableCurrencies: exchangeRates
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};