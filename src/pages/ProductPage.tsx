import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Globe, 
  Award, 
  Users,
  Check, 
  Download,
  Lock,
  ThumbsUp,
  AlertCircle,
  Package,
  Calendar
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  price: number;
  currency: string;
  image: string;
  gallery: string[];
  category: string;
  features: string[];
  type: 'digital' | 'physical' | 'event';
  vendor: {
    name: string;
    rating: number;
    profileImage: string;
    productsCount: number;
    joinedDate: string;
  };
  reviews: {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
    userImage: string;
  }[];
  relatedProducts: {
    id: string;
    title: string;
    price: number;
    image: string;
  }[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Get affiliate and recruiter IDs from URL params (for referral tracking)
  const urlParams = new URLSearchParams(window.location.search);
  const affiliateId = urlParams.get('affiliate');
  const recruiterId = urlParams.get('recruiter');

  useEffect(() => {
    // Mock API call
    const fetchProduct = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Mock product data
        const mockProduct: Product = {
          id: id || '1',
          title: 'The TIGS Program',
          description: 'Complete guide to transforming your digital business strategy',
          detailedDescription: `
            <p>The TIGS Program is a comprehensive digital transformation system designed to help entrepreneurs and established businesses leverage technology to grow their revenue and scale operations.</p>
            
            <p>This program includes:</p>
            <ul>
              <li>12 in-depth modules covering every aspect of digital business growth</li>
              <li>Over 50 video tutorials with step-by-step instructions</li>
              <li>Proprietary tools and templates for immediate implementation</li>
              <li>Case studies of successful businesses that followed this framework</li>
              <li>6 months of access to our community and support forum</li>
            </ul>
            
            <p>The TIGS methodology has helped over 10,000 entrepreneurs increase their revenue by an average of 43% within the first year of implementation.</p>
          `,
          price: 299,
          currency: 'USD',
          image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=600',
          gallery: [
            'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/6476766/pexels-photo-6476766.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/6476263/pexels-photo-6476263.jpeg?auto=compress&cs=tinysrgb&w=600'
          ],
          category: 'Business',
          features: [
            'Instant digital delivery',
            'Lifetime updates',
            'Email support',
            'Membership to exclusive community',
            'Implementation toolkits and templates'
          ],
          type: 'digital',
          vendor: {
            name: 'Digital Mastery Inc.',
            rating: 4.8,
            profileImage: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600',
            productsCount: 15,
            joinedDate: '2023-01-15'
          },
          reviews: [
            {
              id: '1',
              user: 'Jonathan Lee',
              rating: 5,
              comment: 'This program transformed my business. The strategies for customer acquisition alone were worth the investment.',
              date: '2025-03-10',
              userImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
              id: '2',
              user: 'Michelle Rodriguez',
              rating: 4,
              comment: 'Very comprehensive program with practical advice. Took some time to implement everything but saw results within 2 months.',
              date: '2025-03-05',
              userImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
              id: '3',
              user: 'David Chen',
              rating: 5,
              comment: "The community access alone is worth the price. I've made valuable connections and partnerships through this program.",
              date: '2025-02-22',
              userImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
            }
          ],
          relatedProducts: [
            {
              id: '2',
              title: 'AI Marketing Mastery',
              price: 199,
              image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
              id: '3',
              title: 'E-Commerce Success Blueprint',
              price: 149,
              image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600'
            },
            {
              id: '6',
              title: 'Affiliate Marketing Formula',
              price: 249,
              image: 'https://images.pexels.com/photos/7063776/pexels-photo-7063776.jpeg?auto=compress&cs=tinysrgb&w=600'
            }
          ]
        };
        
        setProduct(mockProduct);
        setSelectedImage(mockProduct.image);
        setLoading(false);
      }, 500);
    };
    
    fetchProduct();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleBuyNow = () => {
    if (!product) return;
    
    // Build checkout URL with referral parameters
    let checkoutUrl = `/checkout/${product.id}`;
    const params = new URLSearchParams();
    
    if (affiliateId) params.append('affiliate', affiliateId);
    if (recruiterId) params.append('recruiter', recruiterId);
    
    if (params.toString()) {
      checkoutUrl += `?${params.toString()}`;
    }
    
    navigate(checkoutUrl);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed</p>
          <Link 
            to="/marketplace" 
            className="inline-flex items-center px-4 py-2 bg-navy-800 text-white rounded-md hover:bg-navy-900 transition-colors"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-navy-700">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/marketplace" className="text-gray-600 hover:text-navy-700">Marketplace</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to={`/marketplace?category=${product.category.toLowerCase()}`} className="text-gray-600 hover:text-navy-700">
                    {product.category}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{product.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Referral Notice */}
        {(affiliateId || recruiterId) && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <Users className="text-green-600 mr-2" size={20} />
              <div>
                <h4 className="font-medium text-green-900">Special Referral Offer</h4>
                <p className="text-sm text-green-700">
                  You've been referred by one of our partners. 
                  {affiliateId && ` Affiliate: ${affiliateId}`}
                  {recruiterId && ` • Recruiter: ${recruiterId}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-2 mb-4 h-[400px] flex items-center justify-center overflow-hidden">
              <img 
                src={selectedImage} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden h-20
                    ${selectedImage === image ? 'border-navy-600' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <span className={`inline-block px-2 py-1 text-xs rounded mb-3
              ${product.type === 'digital' ? 'bg-blue-100 text-blue-800' : 
                product.type === 'physical' ? 'bg-green-100 text-green-800' : 
                'bg-purple-100 text-purple-800'}`}
            >
              {product.type.charAt(0).toUpperCase() + product.type.slice(1)} Product
            </span>
            
            <h1 className="text-3xl font-bold text-navy-900 mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.vendor.rating) ? 'text-gold-500' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {product.vendor.rating} ({product.reviews.length} reviews)
              </span>
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold text-navy-900">{product.currency} {product.price.toLocaleString()}</span>
              <span className="ml-2 text-sm text-green-600">One-time payment</span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-navy-800 font-medium mb-2">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {product.type === 'physical' ? (
              <div className="mb-6 flex items-center">
                <label htmlFor="quantity" className="block mr-4 text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="px-3 py-1 border-r border-gray-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    className="px-3 py-1 border-l border-gray-300"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : null}
            
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md flex items-center justify-center font-medium transition-colors"
              >
                {product.type === 'digital' ? (
                  <>
                    <Download size={20} className="mr-2" />
                    Buy Now
                  </>
                ) : product.type === 'event' ? (
                  <>
                    <Package size={20} className="mr-2" />
                    Reserve Ticket
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="px-4 py-3 border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white rounded-md transition-colors">
                <Heart size={20} />
              </button>
              <button className="px-4 py-3 border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white rounded-md transition-colors">
                <Share2 size={20} />
              </button>
            </div>
            
            {/* Vendor Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <img 
                  src={product.vendor.profileImage} 
                  alt={product.vendor.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-medium text-navy-900">{product.vendor.name}</h3>
                  <div className="flex text-sm text-gray-600">
                    <span className="flex items-center">
                      <Package size={14} className="mr-1" />
                      {product.vendor.productsCount} products
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Users size={14} className="mr-1" />
                      Vendor since {new Date(product.vendor.joinedDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'description' 
                  ? 'border-navy-800 text-navy-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'reviews' 
                  ? 'border-navy-800 text-navy-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Reviews ({product.reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('vendor')}
              className={`py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'vendor' 
                  ? 'border-navy-800 text-navy-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Vendor Info
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mb-12">
          {activeTab === 'description' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product.detailedDescription }}
              />
              
              {product.type === 'digital' && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-navy-900 mb-4">What You'll Get</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                    <Download className="text-blue-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-navy-900">Instant Digital Delivery</h4>
                      <p className="text-gray-600">
                        After purchase, you'll receive immediate access to download all program materials, 
                        including videos, PDFs, and resource files.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {product.type === 'physical' && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-navy-900 mb-4">Shipping Information</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <Globe className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-navy-900">Worldwide Shipping</h4>
                      <p className="text-gray-600">
                        We ship to most countries worldwide. Delivery times vary by location:
                        <br />
                        - US/Canada: 3-5 business days
                        <br />
                        - Europe: 5-10 business days
                        <br />
                        - Rest of World: 7-14 business days
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {product.type === 'event' && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-navy-900 mb-4">Event Details</h3>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start">
                    <Calendar className="text-purple-600 mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-navy-900">Virtual Event Access</h4>
                      <p className="text-gray-600">
                        After purchase, you'll receive a confirmation email with instructions on 
                        how to join the virtual event. You'll also get access to recordings after the event concludes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                <div className="md:w-1/3">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-navy-900 mb-2">{product.vendor.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-6 h-6 ${i < Math.floor(product.vendor.rating) ? 'text-gold-500' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600">{product.reviews.length} reviews</p>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-lg font-medium text-navy-900 mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {product.reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start">
                          <img 
                            src={review.userImage} 
                            alt={review.user} 
                            className="w-10 h-10 rounded-full object-cover mr-4"
                          />
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-navy-900 mr-2">{review.user}</h4>
                              <span className="text-sm text-gray-600">- {review.date}</span>
                            </div>
                            <div className="flex my-1">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-gold-500' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-navy-800 hover:bg-navy-900">
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'vendor' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="md:w-1/3">
                  <div className="text-center">
                    <img 
                      src={product.vendor.profileImage} 
                      alt={product.vendor.name} 
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-navy-900 mb-1">{product.vendor.name}</h3>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(product.vendor.rating) ? 'text-gold-500' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{product.vendor.rating} average rating</p>
                    
                    <div className="flex justify-center space-x-3">
                      <button className="inline-flex items-center px-3 py-1 border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white rounded-md text-sm transition-colors">
                        View Store
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-md text-sm transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-lg font-medium text-navy-900 mb-4">About {product.vendor.name}</h3>
                  <p className="text-gray-600 mb-6">
                    Digital Mastery Inc. is a leading provider of business transformation and 
                    digital marketing programs. With over 10 years of experience in the industry, 
                    we've helped thousands of entrepreneurs and established businesses leverage 
                    technology to scale their operations and increase revenue.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <Award className="text-navy-600 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium text-navy-900">Certified Expert</h4>
                        <p className="text-gray-600">Verified business credentials</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="text-navy-600 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium text-navy-900">{product.vendor.productsCount}+ Products</h4>
                        <p className="text-gray-600">In the Hisnak Marketplace</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <ThumbsUp className="text-navy-600 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium text-navy-900">98% Satisfaction</h4>
                        <p className="text-gray-600">From verified customers</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Globe className="text-navy-600 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium text-navy-900">Global Reach</h4>
                        <p className="text-gray-600">Customers in 45+ countries</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-navy-900 mb-2">Vendor Guarantee</h4>
                    <div className="flex items-start">
                      <Lock className="text-green-600 mr-3 mt-1" size={20} />
                      <p className="text-gray-600">
                        All products from Digital Mastery Inc. come with a 30-day satisfaction guarantee. 
                        If you're not completely satisfied with your purchase, contact us for a full refund.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map(product => (
              <Link to={`/marketplace/product/${product.id}`} key={product.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-navy-900 mb-2">{product.title}</h3>
                    <span className="text-lg font-bold text-navy-900">
                      USD {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Become an Affiliate CTA */}
        <div className="bg-navy-800 text-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-2">Earn by Promoting This Product</h2>
              <p className="text-gray-300 mb-4">
                Join our affiliate program and earn up to 30% commission on every sale you refer.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="text-green-400 mr-2" size={18} />
                  <span>Commission: {(product.price * 0.3).toLocaleString()} USD per sale (30%)</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-400 mr-2" size={18} />
                  <span>90-day cookie tracking</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-400 mr-2" size={18} />
                  <span>Marketing materials provide</span>
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/register"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Become an Affiliate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;