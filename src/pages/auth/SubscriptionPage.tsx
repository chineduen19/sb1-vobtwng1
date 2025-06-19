import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, BookOpen, Check, ArrowRight } from 'lucide-react';
import PriceDisplay from '../../components/shared/PriceDisplay';
import PaymentMethodSelector from '../../components/payment/PaymentMethodSelector';
import { usePayment } from '../../contexts/PaymentContext';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { processPayment, selectedPaymentMethod } = usePayment();
  const [selectedOption, setSelectedOption] = useState<'subscription' | 'program' | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedPaymentMethod || !selectedOption) return;

    setProcessing(true);
    const amount = selectedOption === 'subscription' ? 50 : 299;
    
    try {
      const success = await processPayment(amount, 'USD', selectedPaymentMethod);
      if (success) {
        navigate(selectedOption === 'subscription' 
          ? '/dashboard/affiliate'
          : '/dashboard/customer');
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900">Choose Your Path</h1>
          <p className="mt-2 text-lg text-gray-600">
            Select how you'd like to get started with Hisnak
          </p>
        </div>

        {!showPayment ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Subscription Option */}
            <div 
              className={`bg-white rounded-lg shadow-md p-6 border-2 cursor-pointer
                ${selectedOption === 'subscription' 
                  ? 'border-green-500' 
                  : 'border-transparent hover:border-gray-200'}`}
              onClick={() => setSelectedOption('subscription')}
            >
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-10 h-10 text-green-500" />
                <PriceDisplay amount={50} showCurrencySelector />
              </div>
              <h2 className="text-xl font-bold text-navy-900 mb-2">
                Affiliate Subscription
              </h2>
              <p className="text-gray-600 mb-4">
                Join our affiliate network and start earning commissions
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  30% commission on product sales
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Access to affiliate marketing tools
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Performance tracking dashboard
                </li>
              </ul>
            </div>

            {/* Program Option */}
            <div 
              className={`bg-white rounded-lg shadow-md p-6 border-2 cursor-pointer
                ${selectedOption === 'program' 
                  ? 'border-green-500' 
                  : 'border-transparent hover:border-gray-200'}`}
              onClick={() => setSelectedOption('program')}
            >
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-10 h-10 text-navy-500" />
                <PriceDisplay amount={299} showCurrencySelector />
              </div>
              <h2 className="text-xl font-bold text-navy-900 mb-2">
                The TIGS Program
              </h2>
              <p className="text-gray-600 mb-4">
                Complete guide to transforming your digital business strategy
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Comprehensive business transformation system
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  12 in-depth training modules
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Lifetime access to updates
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <PaymentMethodSelector onSelect={() => {}} />
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-navy-900">Total:</span>
                <PriceDisplay 
                  amount={selectedOption === 'subscription' ? 50 : 299}
                  showCurrencySelector
                />
              </div>
              
              <button
                onClick={handlePayment}
                disabled={!selectedPaymentMethod || processing}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white font-medium
                  ${processing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'}`}
              >
                {processing ? 'Processing...' : 'Complete Payment'}
                {!processing && <ArrowRight className="ml-2 w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {selectedOption && !showPayment && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowPayment(true)}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
            >
              Continue to Payment
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;