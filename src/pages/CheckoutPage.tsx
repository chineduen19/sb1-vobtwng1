import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { usePayment } from '../contexts/PaymentContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useAuth } from '../contexts/AuthContext';
import PaymentMethodSelector from '../components/payment/PaymentMethodSelector';
import CommissionCalculator from '../components/payment/CommissionCalculator';
import BankTransferUpload from '../components/payment/BankTransferUpload';
import { ArrowLeft, ShoppingCart, CreditCard, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  vendor: {
    id: string;
    name: string;
  };
}

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { processPayment, selectedPaymentMethod } = usePayment();
  const { currency, formatPrice } = useCurrency();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showBankUpload, setShowBankUpload] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get affiliate and recruiter IDs from URL params
  const affiliateId = searchParams.get('affiliate');
  const recruiterId = searchParams.get('recruiter');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Mock product fetch
    const fetchProduct = () => {
      setLoading(true);
      setTimeout(() => {
        const mockProduct: Product = {
          id: id || '1',
          title: 'The TIGS Program',
          price: 299,
          currency: 'USD',
          image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=600',
          vendor: {
            id: 'vendor-1',
            name: 'Digital Mastery Inc.'
          }
        };
        setProduct(mockProduct);
        setLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [id, isAuthenticated, navigate]);

  const handlePayment = async () => {
    if (!product || !selectedPaymentMethod) return;

    setProcessing(true);
    setError(null);

    try {
      const result = await processPayment(
        product.price,
        product.currency,
        selectedPaymentMethod,
        product.id,
        affiliateId || undefined,
        recruiterId || undefined,
        product.vendor.id
      );

      if (result.success && result.transaction) {
        if (selectedPaymentMethod.type === 'bank_transfer') {
          setTransactionId(result.transaction.id);
          setShowBankUpload(true);
        } else {
          // Redirect to success page
          navigate(`/payment/success?transaction=${result.transaction.id}`);
        }
      } else {
        setError(result.error || 'Payment failed');
      }
    } catch (err) {
      setError('Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Product Not Found</h2>
          <button
            onClick={() => navigate('/marketplace')}
            className="text-navy-600 hover:text-navy-800"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  if (showBankUpload && transactionId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <BankTransferUpload
            transactionId={transactionId}
            onUploadComplete={() => navigate(`/payment/success?transaction=${transactionId}`)}
            onCancel={() => navigate('/marketplace')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-navy-600 hover:text-navy-800 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-navy-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-navy-900 mb-4 flex items-center">
                <ShoppingCart className="mr-2" size={24} />
                Order Summary
              </h2>
              
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-navy-900">{product.title}</h3>
                  <p className="text-gray-600">by {product.vendor.name}</p>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-navy-900">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Affiliate Information */}
              {(affiliateId || recruiterId) && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Referral Information</h4>
                  <div className="text-sm text-green-800 space-y-1">
                    {affiliateId && (
                      <div>Referred by Affiliate: <span className="font-medium">{affiliateId}</span></div>
                    )}
                    {recruiterId && (
                      <div>Recruiter: <span className="font-medium">{recruiterId}</span></div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            {!showPaymentMethods ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-navy-900 mb-4 flex items-center">
                  <CreditCard className="mr-2" size={24} />
                  Payment Method
                </h2>
                <button
                  onClick={() => setShowPaymentMethods(true)}
                  className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-navy-400 hover:text-navy-600 transition-colors"
                >
                  Select Payment Method
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <PaymentMethodSelector
                  onSelect={() => {}}
                  amount={product.price}
                  currency={product.currency}
                />
                
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle className="text-red-500 mr-2" size={20} />
                    <span className="text-red-800">{error}</span>
                  </div>
                )}
                
                {selectedPaymentMethod && (
                  <div className="mt-6">
                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      className={`w-full py-3 px-4 rounded-md font-medium transition-colors
                        ${processing
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                    >
                      {processing ? 'Processing...' : `Pay ${formatPrice(product.price, product.currency)}`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Commission Breakdown */}
          <div className="lg:col-span-1">
            <CommissionCalculator
              price={product.price}
              currency={product.currency}
              affiliateId={affiliateId || undefined}
              recruiterId={recruiterId || undefined}
              vendorId={product.vendor.id}
              showBreakdown={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;