import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Heart, Search } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-10 shadow-lg backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                My Movie
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors ${
                location.pathname === '/' ? 'bg-gray-800' : ''
              }`}
            >
              <Search size={18} />
              <span>Search</span>
            </Link>
            <Link 
              to="/favorites" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors ${
                location.pathname === '/favorites' ? 'bg-gray-800' : ''
              }`}
            >
              <Heart size={18} />
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
