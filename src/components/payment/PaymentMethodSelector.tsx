import React from 'react';
import { usePayment } from '../../contexts/PaymentContext';
import { Check, CreditCard, Building, Smartphone } from 'lucide-react';

interface PaymentMethodSelectorProps {
  onSelect: () => void;
  amount: number;
  currency: string;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  onSelect, 
  amount, 
  currency 
}) => {
  const { availablePaymentMethods, selectedPaymentMethod, setSelectedPaymentMethod } = usePayment();

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'paystack':
        return <CreditCard className="text-blue-600" size={24} />;
      case 'flutterwave':
        return <Smartphone className="text-orange-600" size={24} />;
      case 'bank_transfer':
        return <Building className="text-green-600" size={24} />;
      default:
        return <CreditCard className="text-gray-600" size={24} />;
    }
  };

  const getMethodDescription = (type: string) => {
    switch (type) {
      case 'paystack':
        return 'Pay with card, bank transfer, or USSD';
      case 'flutterwave':
        return 'Pay with card, mobile money, or bank';
      case 'bank_transfer':
        return 'Manual bank transfer with proof upload';
      default:
        return '';
    }
  };

  const filteredMethods = availablePaymentMethods.filter(method => 
    method.currencies.includes(currency)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-navy-900">Select Payment Method</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-navy-900">
            {currency} {amount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Total Amount</div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => {
              setSelectedPaymentMethod(method);
              onSelect();
            }}
            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all
              ${selectedPaymentMethod?.id === method.id
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
          >
            <div className="flex items-center">
              <div className="mr-4">
                {getMethodIcon(method.type)}
              </div>
              <div className="text-left">
                <div className="font-medium text-navy-900 flex items-center">
                  {method.name}
                  {method.logo && (
                    <img 
                      src={method.logo} 
                      alt={method.name}
                      className="ml-2 h-6 w-auto"
                    />
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {getMethodDescription(method.type)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Supports: {method.currencies.join(', ')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              {selectedPaymentMethod?.id === method.id && (
                <div className="mr-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                </div>
              )}
              
              {method.type === 'bank_transfer' && (
                <div className="text-right">
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Manual Review
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedPaymentMethod?.type === 'bank_transfer' && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Bank Transfer Instructions</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Bank:</strong> Hisnak Marketplace Bank</p>
            <p><strong>Account Number:</strong> 1234567890</p>
            <p><strong>Account Name:</strong> Hisnak Marketplace Ltd</p>
            <p><strong>Reference:</strong> Use your order ID as reference</p>
          </div>
          <div className="mt-3 text-xs text-blue-700">
            After payment, you'll be able to upload proof of payment for verification.
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;