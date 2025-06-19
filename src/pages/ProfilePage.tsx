import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserPlus, 
  MessageCircle, 
  Share2, 
  Settings, 
  Grid, 
  Users, 
  FileText,
  Info,
  Check,
  X,
  Heart,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  media?: {
    type: 'image' | 'video' | 'document';
    url: string;
  };
}

interface Connection {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'connections' | 'materials' | 'about'>('posts');
  const [isConnected, setIsConnected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const isOwnProfile = currentUser?.name.toLowerCase() === username?.toLowerCase();

  // Mock data
  const profile = {
    name: username || '',
    role: 'Affiliate Marketing Expert',
    avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
    banner: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    bio: 'Helping entrepreneurs scale their digital products through strategic affiliate marketing and community building.',
    stats: {
      connections: 1234,
      products: 15,
      sales: '150K+'
    },
    badges: ['Top Seller', 'Verified', 'Early Adopter'],
    location: 'San Francisco, CA',
    website: 'https://example.com',
    joinedDate: '2024-01-15'
  };

  const posts: Post[] = [
    {
      id: '1',
      content: 'Just launched my new course on affiliate marketing strategies! Check it out in the marketplace. 🚀',
      createdAt: '2025-04-15T10:00:00Z',
      likes: 45,
      comments: 12,
      media: {
        type: 'image',
        url: 'https://images.pexels.com/photos/7063776/pexels-photo-7063776.jpeg'
      }
    },
    {
      id: '2',
      content: 'Sharing my latest case study on how we achieved 300% ROI for our clients using the TIGS methodology.',
      createdAt: '2025-04-14T15:30:00Z',
      likes: 32,
      comments: 8,
      media: {
        type: 'document',
        url: '/documents/case-study.pdf'
      }
    }
  ];

  const connections: Connection[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      role: 'Digital Marketing Specialist'
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      role: 'E-commerce Consultant'
    }
  ];

  const handleConnect = () => {
    if (isPending) {
      setIsPending(false);
    } else if (isConnected) {
      setShowConnectModal(true);
    } else {
      setIsPending(true);
    }
  };

  const handleMessage = () => {
    // Implement chat functionality
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div 
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${profile.banner})` }}
      >
        <div className="container mx-auto px-4 h-full flex items-end">
          <div className="relative -bottom-16 flex items-end">
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <div className="ml-6 mb-4">
              <h1 className="text-3xl font-bold text-white shadow-text">{profile.name}</h1>
              <p className="text-white shadow-text">{profile.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="container mx-auto px-4 mt-20">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {profile.badges.map((badge, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-navy-100 text-navy-800 rounded-full text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="flex space-x-3">
            {!isOwnProfile && (
              <>
                <button
                  onClick={handleConnect}
                  className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors
                    ${isConnected 
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                      : isPending
                        ? 'bg-gold-500 text-white hover:bg-gold-600'
                        : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                  {isConnected ? (
                    <>
                      <Check size={18} className="mr-2" />
                      Connected
                    </>
                  ) : isPending ? (
                    <>
                      <Clock size={18} className="mr-2" />
                      Pending
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} className="mr-2" />
                      Connect
                    </>
                  )}
                </button>
                <button
                  onClick={handleMessage}
                  className="flex items-center px-4 py-2 bg-navy-800 text-white rounded-md font-medium hover:bg-navy-900 transition-colors"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Message
                </button>
              </>
            )}
            {isOwnProfile ? (
              <Link
                to="/settings/profile"
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors"
              >
                <Settings size={18} className="mr-2" />
                Edit Profile
              </Link>
            ) : (
              <button className="p-2 text-gray-600 hover:text-navy-800 transition-colors">
                <Share2 size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-navy-900">{profile.stats.connections}</div>
            <div className="text-gray-600">Connections</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-navy-900">{profile.stats.products}</div>
            <div className="text-gray-600">Products</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-navy-900">{profile.stats.sales}</div>
            <div className="text-gray-600">Total Sales</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'posts' 
                  ? 'border-navy-800 text-navy-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <Grid size={18} className="inline-block mr-2" />
              Posts
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'connections' 
                  ? 'border-navy-800 text-navy-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <Users size={18} className="inline-block mr-2" />
              Connections
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'materials' 
                  ? 'border-navy-800 text-navy-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <FileText size={18} className="inline-block mr-2" />
              Materials
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'about' 
                  ? 'border-navy-800 text-navy-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <Info size={18} className="inline-block mr-2" />
              About
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {activeTab === 'connections' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connections.map(connection => (
                <ConnectionCard key={connection.id} connection={connection} />
              ))}
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Shared Materials</h3>
              <p className="text-gray-600">Content coming soon...</p>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">About {profile.name}</h3>
                <p className="text-gray-600 mb-4">{profile.bio}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-navy-900">Location</h4>
                    <p className="text-gray-600">{profile.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-900">Website</h4>
                    <a href={profile.website} className="text-green-600 hover:text-green-700">
                      {profile.website}
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-900">Joined</h4>
                    <p className="text-gray-600">
                      {formatDistanceToNow(new Date(profile.joinedDate), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disconnect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Remove Connection</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove {profile.name} from your connections?
              They will not be notified.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsConnected(false);
                  setShowConnectModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-800 mb-4">{post.content}</p>
      
      {post.media && (
        <div className="mb-4">
          {post.media.type === 'image' ? (
            <img 
              src={post.media.url} 
              alt="Post media" 
              className="rounded-lg w-full h-64 object-cover"
            />
          ) : post.media.type === 'document' ? (
            <a 
              href={post.media.url}
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <FileText className="text-navy-600 mr-2" />
              <span>View Document</span>
            </a>
          ) : null}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex space-x-4">
          <button className="flex items-center hover:text-navy-800">
            <Heart size={18} className="mr-1" />
            {post.likes}
          </button>
          <button className="flex items-center hover:text-navy-800">
            <MessageCircle size={18} className="mr-1" />
            {post.comments}
          </button>
          <button className="flex items-center hover:text-navy-800">
            <Share2 size={18} className="mr-1" />
            Share
          </button>
        </div>
        <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
      </div>
    </div>
  );
};

const ConnectionCard = ({ connection }: { connection: Connection }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <img 
          src={connection.avatar} 
          alt={connection.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="font-medium text-navy-900">{connection.name}</h3>
          <p className="text-sm text-gray-600">{connection.role}</p>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 px-3 py-1 bg-navy-800 text-white rounded-md text-sm hover:bg-navy-900">
          View Profile
        </button>
        <button className="px-3 py-1 border border-navy-800 text-navy-800 rounded-md text-sm hover:bg-navy-50">
          Message
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;