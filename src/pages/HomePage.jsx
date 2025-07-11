import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies, getTrendingMovies } from '../api/movieApi';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { useFavorites } from '../hooks/useFavorites';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) {
        setMovies([]);
        setTotalResults(0);
        setError(null);
        // Fetch trending movies
        setLoading(true);
        try {
          const trending = await getTrendingMovies();
          setTrendingMovies(trending);
        } catch (err) {
          setTrendingMovies([]);
        } finally {
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchMovies(query, page);
        
        if (response.Response === 'True') {
          setMovies(response.Search);
          setTotalResults(parseInt(response.totalResults));
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(response.Error || 'No movies found');
        }
      } catch (err) {
        setError('An error occurred while fetching movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery, page: '1' });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ q: query, page: newPage.toString() });
  };

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Discover Movies
        </h1>
        <SearchBar onSearch={handleSearch} initialQuery={query} />
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <LoadingSpinner size="large" />
        </div>
      ) : error ? (
        <EmptyState type="error" message={error} />
      ) : movies.length > 0 ? (
        <>
          <div className="mb-4 text-gray-400">
            {totalResults} {totalResults === 1 ? 'result' : 'results'} found
          </div>
          <MovieGrid 
            movies={movies} 
            isFavorite={isFavorite} 
            onToggleFavorite={handleToggleFavorite} 
          />
          <Pagination 
            currentPage={page} 
            totalResults={totalResults} 
            resultsPerPage={10} 
            onPageChange={handlePageChange} 
          />
        </>
      ) : query ? (
        <EmptyState type="no-results" />
      ) : trendingMovies.length > 0 ? (
        <>
          <div className="mb-4 text-gray-400 text-center">
            Trending Movies
          </div>
          <MovieGrid 
            movies={trendingMovies} 
            isFavorite={isFavorite} 
            onToggleFavorite={handleToggleFavorite} 
          />
        </>
      ) : (
        <EmptyState type="search" />
      )}
    </div>
  );
};

export default HomePage;
