import React from 'react';
import { usePayment } from '../../contexts/PaymentContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { Users, DollarSign, Building, Award } from 'lucide-react';

interface CommissionCalculatorProps {
  price: number;
  currency?: string;
  affiliateId?: string;
  recruiterId?: string;
  vendorId?: string;
  showBreakdown?: boolean;
}

const CommissionCalculator: React.FC<CommissionCalculatorProps> = ({ 
  price, 
  currency = 'USD',
  affiliateId,
  recruiterId,
  vendorId,
  showBreakdown = true
}) => {
  const { calculateCommissions, calculatePaymentSplits } = usePayment();
  const { formatPrice } = useCurrency();

  const commissions = calculateCommissions(price);
  const splits = calculatePaymentSplits(price, affiliateId, recruiterId, vendorId);

  const formatAmount = (amount: number) => {
    return formatPrice(amount, currency);
  };

  if (!showBreakdown) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-navy-900 mb-1">
            {formatAmount(price)}
          </div>
          <div className="text-sm text-gray-600">Total Amount</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-navy-900 mb-4 flex items-center">
        <DollarSign className="mr-2 text-green-500" size={20} />
        Commission Breakdown
      </h3>
      
      <div className="space-y-4">
        {/* Vendor Share */}
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <Building className="text-blue-600 mr-3" size={20} />
            <div>
              <span className="font-medium text-blue-900">Vendor Share</span>
              <div className="text-xs text-blue-700">Product creator (50%)</div>
            </div>
          </div>
          <span className="font-bold text-blue-900">{formatAmount(splits.amounts.vendor)}</span>
        </div>

        {/* Affiliate Share */}
        {affiliateId && (
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Users className="text-green-600 mr-3" size={20} />
              <div>
                <span className="font-medium text-green-900">Affiliate Commission</span>
                <div className="text-xs text-green-700">Sales affiliate (30%)</div>
              </div>
            </div>
            <span className="font-bold text-green-900">{formatAmount(splits.amounts.affiliate)}</span>
          </div>
        )}

        {/* Recruiter Share */}
        {recruiterId && (
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center">
              <Award className="text-purple-600 mr-3" size={20} />
              <div>
                <span className="font-medium text-purple-900">Recruiter Bonus</span>
                <div className="text-xs text-purple-700">Affiliate recruiter (10%)</div>
              </div>
            </div>
            <span className="font-bold text-purple-900">{formatAmount(splits.amounts.recruiter)}</span>
          </div>
        )}

        {/* Marketplace Fee */}
        <div className="flex justify-between items-center p-3 bg-gold-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="text-gold-600 mr-3" size={20} />
            <div>
              <span className="font-medium text-gold-900">Platform Fee</span>
              <div className="text-xs text-gold-700">
                Hisnak Marketplace ({((splits.amounts.marketplace / price) * 100).toFixed(0)}%)
              </div>
            </div>
          </div>
          <span className="font-bold text-gold-900">{formatAmount(splits.amounts.marketplace)}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="text-navy-900">Total Amount</span>
          <span className="text-navy-900">{formatAmount(price)}</span>
        </div>
        
        {!affiliateId && !recruiterId && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-sm text-yellow-800">
              <strong>Note:</strong> No affiliate or recruiter linked to this sale. 
              Their commissions will be added to the platform fee.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommissionCalculator;