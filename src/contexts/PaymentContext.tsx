import React, { createContext, useContext, useState } from 'react';
import { useCurrency } from './CurrencyContext';
import { useAuth } from './AuthContext';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'paystack' | 'flutterwave' | 'bank_transfer';
  currencies: string[];
  logo?: string;
}

interface AffiliateCommission {
  affiliate: number; // 30%
  recruiter: number; // 10%
  marketplace: number; // 10%
  vendor: number; // 50%
}

interface PaymentSplit {
  affiliateId?: string;
  recruiterId?: string;
  vendorId: string;
  amounts: {
    affiliate: number;
    recruiter: number;
    marketplace: number;
    vendor: number;
  };
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'manual_review';
  splits: PaymentSplit;
  productId: string;
  customerId: string;
  createdAt: string;
  reference?: string;
  bankTransferProof?: string;
}

interface PaymentContextType {
  processPayment: (
    amount: number, 
    currency: string, 
    paymentMethod: PaymentMethod,
    productId: string,
    affiliateId?: string,
    recruiterId?: string,
    vendorId?: string
  ) => Promise<{ success: boolean; transaction?: Transaction; error?: string }>;
  
  calculateCommissions: (amount: number) => AffiliateCommission;
  calculatePaymentSplits: (
    amount: number,
    affiliateId?: string,
    recruiterId?: string,
    vendorId?: string
  ) => PaymentSplit;
  
  availablePaymentMethods: PaymentMethod[];
  selectedPaymentMethod: PaymentMethod | null;
  setSelectedPaymentMethod: (method: PaymentMethod | null) => void;
  
  // Bank transfer specific
  uploadBankTransferProof: (transactionId: string, proofFile: File) => Promise<boolean>;
  
  // Transaction management
  getTransactionHistory: (userId?: string) => Transaction[];
  getTransactionById: (id: string) => Transaction | null;
  
  // Admin functions
  approveManualPayment: (transactionId: string) => Promise<boolean>;
  getCommissionReport: (dateRange?: { start: Date; end: Date }) => any;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { convertPrice } = useCurrency();
  const { currentUser } = useAuth();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const availablePaymentMethods: PaymentMethod[] = [
    {
      id: 'paystack',
      name: 'Paystack',
      type: 'paystack',
      currencies: ['NGN', 'USD', 'GHS', 'ZAR', 'KES'],
      logo: 'https://paystack.com/assets/img/logo/paystack-logo.png'
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      type: 'flutterwave',
      currencies: ['NGN', 'USD', 'GHS', 'KES', 'UGX', 'TZS'],
      logo: 'https://flutterwave.com/images/logo/full.svg'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      type: 'bank_transfer',
      currencies: ['NGN', 'USD', 'GHS', 'KES']
    }
  ];

  const calculateCommissions = (amount: number): AffiliateCommission => {
    return {
      affiliate: amount * 0.30, // 30%
      recruiter: amount * 0.10, // 10%
      marketplace: amount * 0.10, // 10%
      vendor: amount * 0.50 // 50%
    };
  };

  const calculatePaymentSplits = (
    amount: number,
    affiliateId?: string,
    recruiterId?: string,
    vendorId: string = 'default-vendor'
  ): PaymentSplit => {
    const commissions = calculateCommissions(amount);
    
    return {
      affiliateId,
      recruiterId,
      vendorId,
      amounts: {
        affiliate: affiliateId ? commissions.affiliate : 0,
        recruiter: recruiterId ? commissions.recruiter : 0,
        marketplace: commissions.marketplace + (affiliateId ? 0 : commissions.affiliate) + (recruiterId ? 0 : commissions.recruiter),
        vendor: commissions.vendor
      }
    };
  };

  const generateTransactionReference = (): string => {
    return `HSK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const processPaystackPayment = async (
    amount: number,
    currency: string,
    splits: PaymentSplit,
    reference: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Initialize Paystack payment with subaccounts for split payments
      const paystackConfig = {
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_your_key_here',
        email: currentUser?.email || '',
        amount: amount * 100, // Paystack expects amount in kobo
        currency: currency,
        ref: reference,
        subaccount: splits.vendorId, // Vendor's subaccount
        transaction_charge: splits.amounts.marketplace * 100, // Marketplace fee
        bearer: 'subaccount',
        metadata: {
          splits: [
            {
              type: 'percentage',
              subaccount: splits.affiliateId,
              share: 30
            },
            {
              type: 'percentage', 
              subaccount: splits.recruiterId,
              share: 10
            }
          ]
        }
      };

      // In production, use Paystack's JavaScript SDK
      // const handler = PaystackPop.setup(paystackConfig);
      // handler.openIframe();
      
      // For demo purposes, simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true };
      
    } catch (error) {
      console.error('Paystack payment error:', error);
      return { success: false, error: 'Payment processing failed' };
    }
  };

  const processFlutterwavePayment = async (
    amount: number,
    currency: string,
    splits: PaymentSplit,
    reference: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Initialize Flutterwave payment with split configuration
      const flutterwaveConfig = {
        public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-your_key_here',
        tx_ref: reference,
        amount: amount,
        currency: currency,
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: currentUser?.email || '',
          phone_number: '',
          name: currentUser?.name || ''
        },
        subaccounts: [
          {
            id: splits.vendorId,
            transaction_split_ratio: 50
          },
          {
            id: splits.affiliateId,
            transaction_split_ratio: 30
          },
          {
            id: splits.recruiterId,
            transaction_split_ratio: 10
          }
        ],
        customizations: {
          title: 'Hisnak Marketplace',
          description: 'Payment for digital product',
          logo: 'https://your-logo-url.com/logo.png'
        }
      };

      // In production, use Flutterwave's JavaScript SDK
      // FlutterwaveCheckout(flutterwaveConfig);
      
      // For demo purposes, simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true };
      
    } catch (error) {
      console.error('Flutterwave payment error:', error);
      return { success: false, error: 'Payment processing failed' };
    }
  };

  const processBankTransfer = async (
    amount: number,
    currency: string,
    reference: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // For bank transfer, we just create a pending transaction
      // User will upload proof later
      return { success: true };
    } catch (error) {
      console.error('Bank transfer processing error:', error);
      return { success: false, error: 'Bank transfer setup failed' };
    }
  };

  const processPayment = async (
    amount: number,
    currency: string,
    paymentMethod: PaymentMethod,
    productId: string,
    affiliateId?: string,
    recruiterId?: string,
    vendorId: string = 'default-vendor'
  ): Promise<{ success: boolean; transaction?: Transaction; error?: string }> => {
    try {
      const reference = generateTransactionReference();
      const splits = calculatePaymentSplits(amount, affiliateId, recruiterId, vendorId);
      
      const transaction: Transaction = {
        id: reference,
        amount,
        currency,
        paymentMethod,
        status: 'pending',
        splits,
        productId,
        customerId: currentUser?.id || '',
        createdAt: new Date().toISOString(),
        reference
      };

      let result: { success: boolean; error?: string };

      switch (paymentMethod.type) {
        case 'paystack':
          result = await processPaystackPayment(amount, currency, splits, reference);
          break;
        case 'flutterwave':
          result = await processFlutterwavePayment(amount, currency, splits, reference);
          break;
        case 'bank_transfer':
          result = await processBankTransfer(amount, currency, reference);
          transaction.status = 'manual_review';
          break;
        default:
          result = { success: false, error: 'Unsupported payment method' };
      }

      if (result.success) {
        transaction.status = paymentMethod.type === 'bank_transfer' ? 'manual_review' : 'processing';
        setTransactions(prev => [...prev, transaction]);
        
        // Trigger webhook simulation for successful payments
        if (paymentMethod.type !== 'bank_transfer') {
          setTimeout(() => {
            setTransactions(prev => 
              prev.map(t => 
                t.id === transaction.id 
                  ? { ...t, status: 'completed' as const }
                  : t
              )
            );
          }, 3000);
        }
        
        return { success: true, transaction };
      } else {
        transaction.status = 'failed';
        setTransactions(prev => [...prev, transaction]);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return { success: false, error: 'Payment processing failed' };
    }
  };

  const uploadBankTransferProof = async (transactionId: string, proofFile: File): Promise<boolean> => {
    try {
      // In production, upload to cloud storage (AWS S3, Cloudinary, etc.)
      const proofUrl = URL.createObjectURL(proofFile);
      
      setTransactions(prev =>
        prev.map(t =>
          t.id === transactionId
            ? { ...t, bankTransferProof: proofUrl, status: 'manual_review' as const }
            : t
        )
      );
      
      return true;
    } catch (error) {
      console.error('Proof upload error:', error);
      return false;
    }
  };

  const getTransactionHistory = (userId?: string): Transaction[] => {
    if (userId) {
      return transactions.filter(t => t.customerId === userId);
    }
    return transactions;
  };

  const getTransactionById = (id: string): Transaction | null => {
    return transactions.find(t => t.id === id) || null;
  };

  const approveManualPayment = async (transactionId: string): Promise<boolean> => {
    try {
      setTransactions(prev =>
        prev.map(t =>
          t.id === transactionId
            ? { ...t, status: 'completed' as const }
            : t
        )
      );
      
      // Trigger commission distribution
      const transaction = transactions.find(t => t.id === transactionId);
      if (transaction) {
        // In production, trigger actual payouts to affiliate accounts
        console.log('Distributing commissions:', transaction.splits);
      }
      
      return true;
    } catch (error) {
      console.error('Manual payment approval error:', error);
      return false;
    }
  };

  const getCommissionReport = (dateRange?: { start: Date; end: Date }) => {
    const filteredTransactions = transactions.filter(t => {
      if (!dateRange) return true;
      const transactionDate = new Date(t.createdAt);
      return transactionDate >= dateRange.start && transactionDate <= dateRange.end;
    });

    const report = {
      totalTransactions: filteredTransactions.length,
      totalRevenue: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
      totalCommissions: {
        affiliate: filteredTransactions.reduce((sum, t) => sum + t.splits.amounts.affiliate, 0),
        recruiter: filteredTransactions.reduce((sum, t) => sum + t.splits.amounts.recruiter, 0),
        marketplace: filteredTransactions.reduce((sum, t) => sum + t.splits.amounts.marketplace, 0),
        vendor: filteredTransactions.reduce((sum, t) => sum + t.splits.amounts.vendor, 0)
      },
      transactionsByStatus: {
        completed: filteredTransactions.filter(t => t.status === 'completed').length,
        pending: filteredTransactions.filter(t => t.status === 'pending').length,
        failed: filteredTransactions.filter(t => t.status === 'failed').length,
        manual_review: filteredTransactions.filter(t => t.status === 'manual_review').length
      }
    };

    return report;
  };

  return (
    <PaymentContext.Provider value={{
      processPayment,
      calculateCommissions,
      calculatePaymentSplits,
      availablePaymentMethods,
      selectedPaymentMethod,
      setSelectedPaymentMethod,
      uploadBankTransferProof,
      getTransactionHistory,
      getTransactionById,
      approveManualPayment,
      getCommissionReport
    }}>
      {children}
    </PaymentContext.Provider>
  );
};