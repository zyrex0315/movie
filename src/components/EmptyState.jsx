import React from 'react';
import { CircleAlert, Film, Heart, Search } from 'lucide-react';

const EmptyState = ({ type, message }) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search size={48} className="text-gray-500" />;
      case 'error':
        return <CircleAlert size={48} className="text-red-500" />;
      case 'no-results':
        return <Film size={48} className="text-gray-500" />;
      case 'favorites':
        return <Heart size={48} className="text-gray-500" />;
      default:
        return <Film size={48} className="text-gray-500" />;
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'search':
        return 'Search for a movie to get started';
      case 'error':
        return 'Something went wrong. Please try again later.';
      case 'no-results':
        return 'No movies found. Try a different search term.';
      case 'favorites':
        return 'You haven\'t added any favorites yet.';
      default:
        return 'No content available.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <div className="mb-4 bg-gray-800 p-5 rounded-full">
        {getIcon()}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {type === 'search' ? 'Discover Your Next Favorite Movie' : 
         type === 'error' ? 'Oops! An Error Occurred' :
         type === 'no-results' ? 'No Movies Found' : 
         'No Favorites Yet'}
      </h3>
      <p className="text-gray-400 max-w-md">
        {message || getDefaultMessage()}
      </p>
      {type === 'favorites' && (
        <button className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
          Explore Movies
        </button>
      )}
    </div>
  );
};

export default EmptyState;
