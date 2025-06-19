import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  LineChart, 
  CreditCard, 
  Copy, 
  CheckCircle, 
  Link as LinkIcon,
  Settings,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Zap,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AffiliateDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedRefLink, setCopiedRefLink] = useState(false);

  // Mock data
  const affiliateStats = {
    totalEarnings: 4586.20,
    pendingCommissions: 845.75,
    totalSales: 15320.50,
    referrals: 24,
    conversionRate: 3.8,
    affiliateLink: 'https://hisnakmarketplace.com/?ref=aff123',
    referralLink: 'https://hisnakmarketplace.com/refer?id=aff123'
  };

  const recentCommissions = [
    { id: 1, product: 'The TIGS Program', date: '2025-04-15', amount: 89.70, status: 'Paid' },
    { id: 2, product: 'AI Marketing Mastery', date: '2025-04-12', amount: 59.70, status: 'Paid' },
    { id: 3, product: 'E-Commerce Blueprint', date: '2025-04-10', amount: 44.70, status: 'Processing' },
    { id: 4, product: 'Virtual Marketing Summit', date: '2025-04-05', amount: 149.70, status: 'Paid' },
  ];

  const topProducts = [
    { id: 1, name: 'The TIGS Program', sales: 32, earnings: 2880 },
    { id: 2, name: 'AI Marketing Mastery', sales: 18, earnings: 1078 },
    { id: 3, name: 'E-Commerce Blueprint', sales: 12, earnings: 628 },
  ];

  const downlineAffiliates = [
    { id: 1, name: 'John Doe', joinDate: '2025-03-10', sales: 12, commissions: 360 },
    { id: 2, name: 'Sarah Lee', joinDate: '2025-03-15', sales: 8, commissions: 240 },
    { id: 3, name: 'Mark Wilson', joinDate: '2025-03-22', sales: 5, commissions: 150 },
    { id: 4, name: 'Emma Brown', joinDate: '2025-04-01', sales: 3, commissions: 90 },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Affiliate Marketing Masterclass', date: '2025-04-25', time: '2:00 PM EST' },
    { id: 2, title: 'Product Launch Webinar', date: '2025-05-02', time: '1:00 PM EST' },
  ];

  const copyToClipboard = (text: string, isRefLink: boolean) => {
    navigator.clipboard.writeText(text);
    if (isRefLink) {
      setCopiedRefLink(true);
      setTimeout(() => setCopiedRefLink(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-navy-900">Affiliate Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name || 'Affiliate Partner'}!</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Earnings" 
            value={`$${affiliateStats.totalEarnings.toLocaleString()}`} 
            icon={<DollarSign className="text-green-500" />}
            change="+12.5%"
            positive={true}
          />
          <StatCard 
            title="Pending Commissions" 
            value={`$${affiliateStats.pendingCommissions.toLocaleString()}`} 
            icon={<CreditCard className="text-gold-500" />}
          />
          <StatCard 
            title="Total Referrals" 
            value={affiliateStats.referrals.toString()} 
            icon={<Users className="text-blue-500" />}
            change="+3"
            positive={true}
          />
          <StatCard 
            title="Conversion Rate" 
            value={`${affiliateStats.conversionRate}%`} 
            icon={<LineChart className="text-purple-500" />}
            change="+0.5%"
            positive={true}
          />
        </div>

        {/* Affiliate Links Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-navy-900">Your Affiliate Links</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Affiliate Link</label>
              <div className="flex">
                <input 
                  type="text" 
                  value={affiliateStats.affiliateLink} 
                  readOnly 
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                />
                <button 
                  onClick={() => copyToClipboard(affiliateStats.affiliateLink, false)}
                  className="px-4 py-2 bg-navy-800 text-white rounded-r-md hover:bg-navy-900 transition-colors"
                >
                  {copiedLink ? <CheckCircle size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Use this link when promoting products to earn 30% commission</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Referral Link</label>
              <div className="flex">
                <input 
                  type="text" 
                  value={affiliateStats.referralLink} 
                  readOnly 
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                />
                <button 
                  onClick={() => copyToClipboard(affiliateStats.referralLink, true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition-colors"
                >
                  {copiedRefLink ? <CheckCircle size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Share this link to recruit affiliates and earn 10% from their sales</p>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto mb-6 border-b border-gray-200">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-500 hover:text-navy-700'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'commissions' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-500 hover:text-navy-700'}`}
            onClick={() => setActiveTab('commissions')}
          >
            Commissions
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'downline' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-500 hover:text-navy-700'}`}
            onClick={() => setActiveTab('downline')}
          >
            My Downline
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'marketing' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-500 hover:text-navy-700'}`}
            onClick={() => setActiveTab('marketing')}
          >
            Marketing Tools
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-navy-900">Recent Commissions</h2>
                  <Link to="#" className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                    View All <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentCommissions.map(commission => (
                        <tr key={commission.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-navy-800">{commission.product}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{commission.date}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-navy-800">${commission.amount.toFixed(2)}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              commission.status === 'Paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {commission.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Top Performing Products */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-navy-900">Top Performing Products</h2>
                <div className="space-y-4">
                  {topProducts.map(product => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-navy-800">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-navy-900">${product.earnings.toLocaleString()}</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <ArrowUpRight size={12} className="mr-1" /> High conversion
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-navy-900">Performance</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Monthly Target</span>
                      <span className="text-sm font-medium text-navy-900">$5,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">$3,750 / $5,000</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Downline Growth</span>
                      <span className="text-sm font-medium text-navy-900">30</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">24 / 30</div>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-navy-900">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border-l-4 border-gold-400 pl-3">
                      <h3 className="font-medium text-navy-800">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Calendar size={14} className="mr-1" /> {event.date}, {event.time}
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm mt-1 flex items-center">
                        Register <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Program News */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-navy-900">Program Updates</h2>
                <div className="bg-blue-50 text-blue-800 p-3 rounded-md flex items-start mb-4">
                  <Zap size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">New Commission Structure</h3>
                    <p className="text-sm">Increased rates for premium products starting May 1st!</p>
                  </div>
                </div>
                <div className="bg-green-50 text-green-800 p-3 rounded-md flex items-start">
                  <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Weekly Training Session</h3>
                    <p className="text-sm">Don't miss our affiliate strategy webinar tomorrow at 2PM EST.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'downline' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6 text-navy-900">My Downline Affiliates</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div>
                  <h3 className="font-medium text-navy-900">Downline Summary</h3>
                  <p className="text-sm text-gray-600">You have {downlineAffiliates.length} active downline affiliates</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-navy-900">${downlineAffiliates.reduce((sum, affiliate) => sum + affiliate.commissions, 0).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total downline commissions</p>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Commission</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {downlineAffiliates.map(affiliate => (
                    <tr key={affiliate.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-navy-800">{affiliate.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{affiliate.joinDate}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-navy-800">{affiliate.sales}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">${affiliate.commissions}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button className="text-navy-600 hover:text-navy-900">
                          <LinkIcon size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  positive 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-navy-900">{value}</p>
          {change && (
            <p className={`text-xs mt-1 flex items-center ${positive ? 'text-green-600' : 'text-red-600'}`}>
              {positive ? <ArrowUpRight size={14} className="mr-1" /> : <ChevronDown size={14} className="mr-1" />}
              {change} {positive ? 'increase' : 'decrease'}
            </p>
          )}
        </div>
        <div className="bg-gray-100 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;