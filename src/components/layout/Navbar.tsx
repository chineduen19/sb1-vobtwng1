import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../shared/Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!userRole) return '/login';
    return `/dashboard/${userRole}`;
  };

  const openHisnakProgram = () => {
    window.open('https://hisnakprogram.com', '_blank');
  };

  return (
    <header className="bg-navy-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold text-xl">Hisnak</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <Link to="/marketplace" className="hover:text-gold-400 transition-colors">Marketplace</Link>
            <button 
              onClick={openHisnakProgram}
              className="hover:text-gold-400 transition-colors"
            >
              Hisnak Program
            </button>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to={getDashboardLink()} className="flex items-center space-x-2 hover:text-gold-400">
                  <User size={20} />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-2 hover:text-gold-400"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md border border-green-600 hover:bg-green-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy-800 py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="hover:text-gold-400 transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/marketplace" className="hover:text-gold-400 transition-colors" onClick={toggleMenu}>Marketplace</Link>
            <button 
              onClick={() => {
                openHisnakProgram();
                toggleMenu();
              }}
              className="text-left hover:text-gold-400 transition-colors"
            >
              Hisnak Program
            </button>
            
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="hover:text-gold-400 transition-colors" onClick={toggleMenu}>Dashboard</Link>
                <button 
                  onClick={handleLogout} 
                  className="text-left hover:text-gold-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gold-400 transition-colors" onClick={toggleMenu}>Login</Link>
                <Link to="/register" className="hover:text-gold-400 transition-colors" onClick={toggleMenu}>Register</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;