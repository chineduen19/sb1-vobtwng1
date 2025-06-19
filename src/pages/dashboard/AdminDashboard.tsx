import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, DollarSign, ShoppingBag, Activity, ChevronUp, AlertCircle, Bell, Settings } from 'lucide-react';
import TransactionDashboard from '../../components/admin/TransactionDashboard';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'users' | 'settings'>('overview');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-navy-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name || 'Admin'}!</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto mb-6 border-b border-gray-200">
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-500 hover:text-navy-700'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'transactions' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-500 hover:text-navy-700'}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions & Payments
          </button>
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'users' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-500 hover:text-navy-700'}`}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'settings' ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-500 hover:text-navy-700'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Users"
                value="15,234"
                icon={<Users className="text-blue-500" />}
                change="+12.5%"
                positive={true}
              />
              <StatCard
                title="Revenue"
                value="$142,384"
                icon={<DollarSign className="text-green-500" />}
                change="+8.2%"
                positive={true}
              />
              <StatCard
                title="Total Sales"
                value="4,821"
                icon={<ShoppingBag className="text-purple-500" />}
                change="+15.3%"
                positive={true}
              />
              <StatCard
                title="Active Vendors"
                value="284"
                icon={<Activity className="text-gold-500" />}
                change="+5.4%"
                positive={true}
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <ActivityItem
                      icon={<Users className="text-blue-500" />}
                      title="New User Registration"
                      description="John Smith joined as an affiliate"
                      time="5 minutes ago"
                    />
                    <ActivityItem
                      icon={<DollarSign className="text-green-500" />}
                      title="New Sale"
                      description="The TIGS Program was purchased"
                      time="15 minutes ago"
                    />
                    <ActivityItem
                      icon={<Bell className="text-gold-500" />}
                      title="Vendor Application"
                      description="New vendor application received"
                      time="1 hour ago"
                    />
                    <ActivityItem
                      icon={<AlertCircle className="text-red-500" />}
                      title="Support Ticket"
                      description="New support ticket requires attention"
                      time="2 hours ago"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">System Status</h2>
                  <div className="space-y-4">
                    <StatusItem
                      title="Server Load"
                      value="28%"
                      status="normal"
                    />
                    <StatusItem
                      title="API Response Time"
                      value="145ms"
                      status="normal"
                    />
                    <StatusItem
                      title="Error Rate"
                      value="0.02%"
                      status="normal"
                    />
                    <StatusItem
                      title="Database Usage"
                      value="72%"
                      status="warning"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <button className="w-full bg-navy-800 text-white px-4 py-2 rounded-md hover:bg-navy-900 transition-colors">
                      View All Users
                    </button>
                    <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                      Manage Products
                    </button>
                    <button className="w-full bg-gold-500 text-white px-4 py-2 rounded-md hover:bg-gold-600 transition-colors">
                      Review Applications
                    </button>
                    <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                      System Settings
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  <div className="space-y-4">
                    <NotificationItem
                      type="warning"
                      message="Database usage approaching limit"
                      time="10 minutes ago"
                    />
                    <NotificationItem
                      type="info"
                      message="System update scheduled for tonight"
                      time="1 hour ago"
                    />
                    <NotificationItem
                      type="success"
                      message="Backup completed successfully"
                      time="2 hours ago"
                    />
                    <NotificationItem
                      type="error"
                      message="Failed login attempts detected"
                      time="3 hours ago"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'transactions' && <TransactionDashboard />}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-gray-600">User management features coming soon...</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">System Settings</h2>
            <p className="text-gray-600">System settings coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components (keeping existing ones)
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
              <ChevronUp className={`h-4 w-4 ${positive ? '' : 'rotate-180'}`} />
              {change}
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

const ActivityItem = ({ 
  icon, 
  title, 
  description, 
  time 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  time: string;
}) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-gray-100 p-2 rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-navy-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  );
};

const StatusItem = ({ 
  title, 
  value, 
  status 
}: { 
  title: string; 
  value: string; 
  status: 'normal' | 'warning' | 'critical';
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500';
      case 'warning':
        return 'bg-gold-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-navy-900">{title}</h3>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
      <div className={`h-3 w-3 rounded-full ${getStatusColor(status)}`}></div>
    </div>
  );
};

const NotificationItem = ({ 
  type, 
  message, 
  time 
}: { 
  type: 'info' | 'warning' | 'error' | 'success'; 
  message: string; 
  time: string;
}) => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'warning':
        return 'bg-gold-50 text-gold-800 border-gold-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`p-3 rounded-md border ${getTypeStyles(type)}`}>
      <p className="text-sm font-medium">{message}</p>
      <span className="text-xs opacity-75">{time}</span>
    </div>
  );
};

export default AdminDashboard;