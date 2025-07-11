import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../api/movieApi';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { ArrowLeft, Award, Calendar, Clock, Film, Heart, Star } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getMovieDetails(id);
        
        if (response.Response === 'True') {
          setMovie(response);
        } else {
          setError(response.Error || 'Movie details not found');
        }
      } catch (err) {
        setError('An error occurred while fetching movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!movie) return;
    
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster
      });
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" fullPage />;
  }

  if (error || !movie) {
    return <EmptyState type="error" message={error || 'Movie not found'} />;
  }

  const favorited = isFavorite(movie.imdbID);

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 mb-6 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            {movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="aspect-[2/3] bg-gray-700 flex items-center justify-center">
                <Film size={64} className="text-gray-500" />
              </div>
            )}
            <button
              onClick={handleToggleFavorite}
              className="absolute top-4 right-4 p-3 rounded-full bg-gray-900/70 hover:bg-gray-800 transition-colors"
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
                size={24} 
                className={`${favorited ? 'fill-red-500 text-red-500' : 'text-white'}`} 
              />
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-white mb-2">{movie.Title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {movie.Year && (
              <div className="flex items-center space-x-1 text-gray-400">
                <Calendar size={16} />
                <span>{movie.Year}</span>
              </div>
            )}
            {movie.Runtime && movie.Runtime !== 'N/A' && (
              <div className="flex items-center space-x-1 text-gray-400">
                <Clock size={16} />
                <span>{movie.Runtime}</span>
              </div>
            )}
            {movie.Rated && movie.Rated !== 'N/A' && (
              <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
                {movie.Rated}
              </span>
            )}
          </div>
          
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1 bg-yellow-600 text-white px-3 py-1 rounded-md">
                <Star size={16} className="fill-white" />
                <span className="font-bold">{movie.imdbRating}</span>
              </div>
              {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                <span className="text-gray-400 text-sm">
                  ({parseInt(movie.imdbVotes.replace(/,/g, '')).toLocaleString()} votes)
                </span>
              )}
            </div>
          )}
          
          {movie.Genre && movie.Genre !== 'N/A' && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {movie.Genre.split(', ').map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Plot</h2>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {movie.Director && movie.Director !== 'N/A' && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Director</h3>
                <p className="text-white">{movie.Director}</p>
              </div>
            )}
            
            {movie.Writer && movie.Writer !== 'N/A' && (
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Writer</h3>
                <p className="text-white">{movie.Writer}</p>
              </div>
            )}
            
            {movie.Actors && movie.Actors !== 'N/A' && (
              <div className="md:col-span-2">
                <h3 className="text-gray-400 text-sm mb-1">Cast</h3>
                <p className="text-white">{movie.Actors}</p>
              </div>
            )}
          </div>
          
          {movie.Awards && movie.Awards !== 'N/A' && (
            <div className="mt-6 flex items-start space-x-2 bg-gray-800 p-4 rounded-lg">
              <Award size={24} className="text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium mb-1">Awards</h3>
                <p className="text-gray-300">{movie.Awards}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
