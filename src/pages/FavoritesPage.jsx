import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import MovieGrid from '../components/MovieGrid';
import EmptyState from '../components/EmptyState';

const FavoritesPage = () => {
  const { favorites, isFavorite, removeFavorite } = useFavorites();

  const handleToggleFavorite = (movie) => {
    removeFavorite(movie.imdbID);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Your Favorite Movies
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">
          Here you can find all the movies you've saved. Your favorites are stored locally on your device.
        </p>
      </div>

      {favorites.length > 0 ? (
        <>
          <div className="mb-4 text-gray-400">
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
          </div>
          <MovieGrid 
            movies={favorites} 
            isFavorite={isFavorite} 
            onToggleFavorite={handleToggleFavorite} 
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <EmptyState type="favorites" />
          <Link 
            to="/" 
            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Find Movies to Add
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
