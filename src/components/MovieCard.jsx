import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Poster+Available';

  return (
    <div className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : placeholderImage}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate" title={movie.Title}>
            {movie.Title}
          </h3>
          <p className="text-gray-400 text-sm">{movie.Year}</p>
          <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
            {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
          </span>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite();
        }}
        className="absolute top-2 right-2 p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          size={20} 
          className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
        />
      </button>
    </div>
  );
};

export default MovieCard;
