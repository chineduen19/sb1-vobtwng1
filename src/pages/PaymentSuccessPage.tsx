import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { usePayment } from '../contexts/PaymentContext';
import { Check, Download, Share2, Home } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { getTransactionById } = usePayment();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const transactionId = searchParams.get('transaction');

  useEffect(() => {
    if (transactionId) {
      const txn = getTransactionById(transactionId);
      setTransaction(txn);
    }
    setLoading(false);
  }, [transactionId, getTransactionById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-900"></div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Transaction Not Found</h2>
          <Link to="/marketplace" className="text-navy-600 hover:text-navy-800">
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = transaction.status === 'completed';
  const isPending = transaction.status === 'manual_review' || transaction.status === 'processing';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6
            ${isCompleted ? 'bg-green-100' : 'bg-yellow-100'}`}>
            {isCompleted ? (
              <Check className="text-green-600" size={40} />
            ) : (
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-600"></div>
            )}
          </div>

          {/* Title and Message */}
          <h1 className="text-3xl font-bold text-navy-900 mb-4">
            {isCompleted ? 'Payment Successful!' : 'Payment Received!'}
          </h1>
          
          <p className="text-gray-600 mb-8">
            {isCompleted 
              ? 'Your payment has been processed successfully and your purchase is complete.'
              : isPending && transaction.paymentMethod.type === 'bank_transfer'
                ? 'Your payment proof has been received and is being reviewed. You will be notified once approved.'
                : 'Your payment is being processed. This may take a few minutes.'
            }
          </p>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-navy-900 mb-4">Transaction Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">{transaction.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  {transaction.currency} {transaction.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{transaction.paymentMethod.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${isCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'}`}>
                  {transaction.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Commission Information */}
          {(transaction.splits.affiliateId || transaction.splits.recruiterId) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-blue-900 mb-4">Commission Distribution</h3>
              <div className="space-y-2 text-sm">
                {transaction.splits.affiliateId && (
                  <div className="flex justify-between">
                    <span className="text-blue-700">Affiliate Commission:</span>
                    <span className="font-medium text-blue-900">
                      {transaction.currency} {transaction.splits.amounts.affiliate.toLocaleString()}
                    </span>
                  </div>
                )}
                {transaction.splits.recruiterId && (
                  <div className="flex justify-between">
                    <span className="text-blue-700">Recruiter Bonus:</span>
                    <span className="font-medium text-blue-900">
                      {transaction.currency} {transaction.splits.amounts.recruiter.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-blue-700">Vendor Earnings:</span>
                  <span className="font-medium text-blue-900">
                    {transaction.currency} {transaction.splits.amounts.vendor.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isCompleted && (
              <button className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                <Download size={20} className="mr-2" />
                Download Product
              </button>
            )}
            
            <button className="flex items-center justify-center px-6 py-3 border border-navy-600 text-navy-600 rounded-md hover:bg-navy-50 transition-colors">
              <Share2 size={20} className="mr-2" />
              Share Purchase
            </button>
            
            <Link
              to="/marketplace"
              className="flex items-center justify-center px-6 py-3 bg-navy-800 text-white rounded-md hover:bg-navy-900 transition-colors"
            >
              <Home size={20} className="mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              A confirmation email has been sent to your registered email address.
              {!isCompleted && ' You will receive another email once your payment is confirmed.'}
            </p>
            {!isCompleted && transaction.paymentMethod.type === 'bank_transfer' && (
              <p className="mt-2">
                Bank transfer payments are typically reviewed within 24 hours during business days.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;