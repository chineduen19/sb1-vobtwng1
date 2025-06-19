import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  vendor: {
    name: string;
    rating: number;
  };
  type: 'digital' | 'physical' | 'event';
}

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Mock products data
  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'The TIGS Program',
      description: 'Complete guide to transforming your digital business strategy',
      price: 299,
      currency: 'USD',
      image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Business',
      vendor: {
        name: 'Digital Mastery Inc.',
        rating: 4.8
      },
      type: 'digital'
    },
    {
      id: '2',
      title: 'AI Marketing Mastery',
      description: 'Learn how to leverage AI for your marketing campaigns',
      price: 199,
      currency: 'USD',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Marketing',
      vendor: {
        name: 'Future Marketing Academy',
        rating: 4.6
      },
      type: 'digital'
    },
    {
      id: '3',
      title: 'E-Commerce Success Blueprint',
      description: 'Step-by-step guide to building a profitable online store',
      price: 149,
      currency: 'USD',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'E-Commerce',
      vendor: {
        name: 'Online Retail Experts',
        rating: 4.9
      },
      type: 'digital'
    },
    {
      id: '4',
      title: 'Virtual Marketing Summit',
      description: 'Access to exclusive digital marketing conference',
      price: 499,
      currency: 'USD',
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Events',
      vendor: {
        name: 'Global Marketing Alliance',
        rating: 4.7
      },
      type: 'event'
    },
    {
      id: '5',
      title: 'Smart Watch Pro',
      description: 'Advanced fitness and productivity tracking wearable',
      price: 299,
      currency: 'USD',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Tech',
      vendor: {
        name: 'TechGadgets Ltd',
        rating: 4.5
      },
      type: 'physical'
    },
    {
      id: '6',
      title: 'Affiliate Marketing Formula',
      description: 'Complete system for generating passive income',
      price: 249,
      currency: 'USD',
      image: 'https://images.pexels.com/photos/7063776/pexels-photo-7063776.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Affiliate',
      vendor: {
        name: 'Income Stream Creators',
        rating: 4.9
      },
      type: 'digital'
    },
  ];

  // Filter products based on search query and filters
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter.toLowerCase();
    
    const matchesType = typeFilter === 'all' || product.type === typeFilter;
    
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'under100' && product.price < 100) ||
                        (priceFilter === '100to200' && product.price >= 100 && product.price <= 200) ||
                        (priceFilter === '200to500' && product.price > 200 && product.price <= 500) ||
                        (priceFilter === 'over500' && product.price > 500);
    
    return matchesSearch && matchesCategory && matchesType && matchesPrice;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Hisnak Marketplace</h1>
          <p className="text-xl text-center max-w-2xl mx-auto mb-8">
            Discover digital products, physical goods, and events from our global network of vendors.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto relative">
            <div className="flex items-center bg-white rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-grow px-4 py-3 text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-green-600 hover:bg-green-700 px-6 py-3 text-white transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-navy-900">Filters</h3>
                  <Filter size={20} className="text-navy-900" />
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-navy-800">Category</h4>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Tech">Tech</option>
                    <option value="Events">Events</option>
                    <option value="Affiliate">Affiliate</option>
                  </select>
                </div>
                
                {/* Product Type Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-navy-800">Product Type</h4>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="digital">Digital Products</option>
                    <option value="physical">Physical Products</option>
                    <option value="event">Events & Tickets</option>
                  </select>
                </div>
                
                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-navy-800">Price Range</h4>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="under100">Under $100</option>
                    <option value="100to200">$100 - $200</option>
                    <option value="200to500">$200 - $500</option>
                    <option value="over500">Over $500</option>
                  </select>
                </div>
                
                <button 
                  className="w-full bg-navy-800 hover:bg-navy-900 text-white py-2 rounded-md transition-colors"
                  onClick={() => {
                    setCategoryFilter('all');
                    setTypeFilter('all');
                    setPriceFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-navy-900">
                  {filteredProducts.length} Products
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Sort by:</span>
                  <select className="border border-gray-300 rounded-md px-3 py-2">
                    <option>Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-navy-900">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => {
                      setCategoryFilter('all');
                      setTypeFilter('all');
                      setPriceFilter('all');
                      setSearchQuery('');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const productTypeTag = () => {
    switch(product.type) {
      case 'digital':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Digital</span>;
      case 'physical':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Physical</span>;
      case 'event':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Event</span>;
      default:
        return null;
    }
  };

  return (
    <Link to={`/marketplace/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-navy-900">{product.title}</h3>
            {productTypeTag()}
          </div>
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-navy-900">
              {product.currency} {product.price.toLocaleString()}
            </span>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-1">{product.vendor.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.vendor.rating) ? 'text-gold-500' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MarketplacePage;