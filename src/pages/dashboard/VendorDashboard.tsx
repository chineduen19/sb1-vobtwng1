import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Package, DollarSign, Users, TrendingUp } from 'lucide-react';

const VendorDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-navy-900">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name || 'Vendor'}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value="$12,450"
            icon={<DollarSign className="text-green-500" />}
            change="+15.3%"
            positive={true}
          />
          <StatCard
            title="Active Products"
            value="24"
            icon={<Package className="text-blue-500" />}
            change="+2"
            positive={true}
          />
          <StatCard
            title="Total Customers"
            value="1,234"
            icon={<Users className="text-purple-500" />}
            change="+12.5%"
            positive={true}
          />
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            icon={<TrendingUp className="text-gold-500" />}
            change="+0.8%"
            positive={true}
          />
        </div>

        {/* Content Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">Vendor dashboard content coming soon...</p>
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

export default VendorDashboard;