import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingBag, Clock, Heart, CreditCard } from 'lucide-react';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-navy-900">Customer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name || 'Customer'}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value="12"
            icon={<ShoppingBag className="text-green-500" />}
          />
          <StatCard
            title="Pending Orders"
            value="2"
            icon={<Clock className="text-gold-500" />}
          />
          <StatCard
            title="Wishlist Items"
            value="8"
            icon={<Heart className="text-red-500" />}
          />
          <StatCard
            title="Total Spent"
            value="$1,234"
            icon={<CreditCard className="text-navy-500" />}
          />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">#ORD-001</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">The TIGS Program</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-15</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">$299.00</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">#ORD-002</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">AI Marketing Mastery</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-10</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">$199.00</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Wishlist */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-navy-900">E-Commerce Blueprint</h3>
              <p className="text-sm text-gray-600 mb-2">Step-by-step guide to building a profitable online store</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-navy-900">$149.00</span>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-navy-900">Virtual Marketing Summit</h3>
              <p className="text-sm text-gray-600 mb-2">Access to exclusive digital marketing conference</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-navy-900">$499.00</span>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
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

export default CustomerDashboard;