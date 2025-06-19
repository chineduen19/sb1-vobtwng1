import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { ChevronDown } from 'lucide-react';

interface PriceDisplayProps {
  amount: number;
  showCurrencySelector?: boolean;
  className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  amount, 
  showCurrencySelector = false,
  className = ''
}) => {
  const { currency, setCurrency, formatPrice, availableCurrencies } = useCurrency();
  const [showCurrencies, setShowCurrencies] = React.useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center">
        <span className="text-2xl font-bold">{formatPrice(amount, currency)}</span>
        {showCurrencySelector && (
          <button
            onClick={() => setShowCurrencies(!showCurrencies)}
            className="ml-2 p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronDown size={20} />
          </button>
        )}
      </div>

      {showCurrencySelector && showCurrencies && (
        <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="py-1">
            {availableCurrencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setCurrency(curr.code);
                  setShowCurrencies(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                  currency === curr.code ? 'bg-gray-50 text-navy-800' : 'text-gray-700'
                }`}
              >
                <span className="font-medium">{curr.code}</span>
                <span className="ml-2 text-gray-500">{curr.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;