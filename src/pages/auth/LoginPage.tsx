import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/shared/Logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Trim email and password to remove any whitespace
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    if (!trimmedEmail || !trimmedPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      await login(trimmedEmail, trimmedPassword);
      
      // Demo accounts based on email - redirect to appropriate dashboard
      const normalizedEmail = trimmedEmail.toLowerCase();
      if (normalizedEmail === 'admin@example.com') {
        navigate('/dashboard/admin');
      } else if (normalizedEmail === 'affiliate@example.com') {
        navigate('/dashboard/affiliate');
      } else if (normalizedEmail === 'vendor@example.com') {
        navigate('/dashboard/vendor');
      } else if (normalizedEmail === 'customer@example.com') {
        navigate('/dashboard/customer');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      // Extract specific error message if available, otherwise use default message
      const errorMessage = err?.message || 'Invalid email or password. Please try again.';
      setError(errorMessage);
      console.error('Login error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (userType: string) => {
    setEmail(`${userType}@example.com`);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h2 className="text-3xl font-bold text-navy-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to your Hisnak account</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="#" className="text-sm text-green-600 hover:text-green-700">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-500 focus:border-navy-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white 
                ${isLoading ? 'bg-navy-400' : 'bg-navy-800 hover:bg-navy-900'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 transition-colors
                font-medium`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-navy-300" aria-hidden="true" />
              </span>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-green-600 hover:text-green-700">
                Sign up
              </Link>
            </div>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => fillDemoCredentials('affiliate')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Affiliate Demo
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('vendor')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Vendor Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;