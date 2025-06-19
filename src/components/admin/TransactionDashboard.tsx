import React, { useState } from 'react';
import { usePayment } from '../../contexts/PaymentContext';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Clock, 
  Check, 
  X, 
  Eye,
  Download,
  Filter,
  Calendar
} from 'lucide-react';

const TransactionDashboard: React.FC = () => {
  const { 
    getTransactionHistory, 
    getCommissionReport, 
    approveManualPayment 
  } = usePayment();
  
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('30days');
  const [showTransactionDetails, setShowTransactionDetails] = useState<string | null>(null);

  const transactions = getTransactionHistory();
  const report = getCommissionReport();

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedStatus === 'all') return true;
    return transaction.status === selectedStatus;
  });

  const handleApprovePayment = async (transactionId: string) => {
    const success = await approveManualPayment(transactionId);
    if (success) {
      // Transaction will be updated automatically through context
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'manual_review':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-navy-900">
                {formatCurrency(report.totalRevenue)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
              <p className="text-2xl font-bold text-navy-900">{report.totalTransactions}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Affiliate Commissions</p>
              <p className="text-2xl font-bold text-navy-900">
                {formatCurrency(report.totalCommissions.affiliate)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Reviews</p>
              <p className="text-2xl font-bold text-navy-900">
                {report.transactionsByStatus.manual_review}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Commission Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">Commission Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-900">
              {formatCurrency(report.totalCommissions.vendor)}
            </div>
            <div className="text-sm text-blue-700">Vendor Earnings</div>
            <div className="text-xs text-blue-600">50% of sales</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-900">
              {formatCurrency(report.totalCommissions.affiliate)}
            </div>
            <div className="text-sm text-green-700">Affiliate Commissions</div>
            <div className="text-xs text-green-600">30% of sales</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(report.totalCommissions.recruiter)}
            </div>
            <div className="text-sm text-purple-700">Recruiter Bonuses</div>
            <div className="text-xs text-purple-600">10% of sales</div>
          </div>
          <div className="text-center p-4 bg-gold-50 rounded-lg">
            <div className="text-2xl font-bold text-gold-900">
              {formatCurrency(report.totalCommissions.marketplace)}
            </div>
            <div className="text-sm text-gold-700">Platform Revenue</div>
            <div className="text-xs text-gold-600">10%+ of sales</div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900 mb-4 md:mb-0">Transaction History</h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="manual_review">Manual Review</option>
              <option value="failed">Failed</option>
            </select>
            
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            
            <button className="px-4 py-2 bg-navy-800 text-white rounded-md hover:bg-navy-900 transition-colors flex items-center">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-navy-900">{transaction.reference}</div>
                    <div className="text-sm text-gray-500">Product ID: {transaction.productId}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-navy-900">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.paymentMethod.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowTransactionDetails(transaction.id)}
                        className="text-navy-600 hover:text-navy-900"
                      >
                        <Eye size={16} />
                      </button>
                      
                      {transaction.status === 'manual_review' && (
                        <button
                          onClick={() => handleApprovePayment(transaction.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">No transactions found for the selected filters.</div>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {showTransactionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-navy-900">Transaction Details</h3>
              <button
                onClick={() => setShowTransactionDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            {(() => {
              const transaction = transactions.find(t => t.id === showTransactionDetails);
              if (!transaction) return null;
              
              return (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                      <div className="text-sm text-gray-900">{transaction.id}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <div className="text-sm text-gray-900">
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                      <div className="text-sm text-gray-900">{transaction.paymentMethod.name}</div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission Splits</label>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Vendor:</span>
                        <span className="font-medium">{formatCurrency(transaction.splits.amounts.vendor)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Affiliate:</span>
                        <span className="font-medium">{formatCurrency(transaction.splits.amounts.affiliate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recruiter:</span>
                        <span className="font-medium">{formatCurrency(transaction.splits.amounts.recruiter)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform:</span>
                        <span className="font-medium">{formatCurrency(transaction.splits.amounts.marketplace)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {transaction.bankTransferProof && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Proof</label>
                      <img 
                        src={transaction.bankTransferProof} 
                        alt="Payment proof" 
                        className="max-w-full h-auto rounded-lg border"
                      />
                    </div>
                  )}
                  
                  {transaction.status === 'manual_review' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          handleApprovePayment(transaction.id);
                          setShowTransactionDetails(null);
                        }}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Approve Payment
                      </button>
                      <button
                        onClick={() => setShowTransactionDetails(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDashboard;