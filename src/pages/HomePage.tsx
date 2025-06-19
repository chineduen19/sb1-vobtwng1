import React from 'react';
import { Link } from 'react-router-dom';
import { Users, DollarSign, ShoppingBag, Award, ChevronRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-ash-900 text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Main Sections */}
        <div className="grid md:grid-cols-2 gap-20 mb-20">
          {/* Hisnak Marketplace Section */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hisnak Marketplace
            </h2>
            <p className="text-2xl text-gray-300">
              Online courses and other affiliate products
            </p>
            <div className="mt-8">
              <Link 
                to="/marketplace" 
                className="inline-block px-8 py-3 bg-white text-ash-900 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>

          {/* Hisnak Program Section */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hisnak Program
            </h2>
            <p className="text-2xl text-gray-300">
              All about our affiliate networking program
            </p>
            <div className="mt-8">
              <a 
                href="https://hisnakprogram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-white text-ash-900 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-12">Platform Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-ash-800 rounded-lg p-8">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-gold-400" />
              </div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-gray-300">Registered Affiliate Networkers</div>
              <div className="mt-4 text-2xl font-semibold text-gold-400">6K+</div>
              <div className="text-gray-300">Active Affiliate Networkers</div>
            </div>

            <div className="bg-ash-800 rounded-lg p-8">
              <div className="flex items-center justify-center mb-4">
                <DollarSign className="w-12 h-12 text-green-400" />
              </div>
              <div className="text-4xl font-bold mb-2">$60K</div>
              <div className="text-gray-300">Total Affiliate Sales</div>
              <div className="mt-4 text-2xl font-semibold text-green-400">$20K</div>
              <div className="text-gray-300">Paid to Affiliate Networkers</div>
            </div>

            <div className="bg-ash-800 rounded-lg p-8">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-12 h-12 text-blue-400" />
              </div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-gray-300">Monthly Earning Affiliates</div>
              <div className="mt-4 text-2xl font-semibold text-blue-400">50K+</div>
              <div className="text-gray-300">Products Sold</div>
            </div>
          </div>

          <div className="mt-12">
            <Link 
              to="/register" 
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
            >
              Join Our Network
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;