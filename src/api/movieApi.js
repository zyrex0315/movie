import axios from 'axios';


const API_KEY = 'f73aa32';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page,
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return {
      Search: [],
      totalResults: '0',
      Response: 'False',
      Error: 'Failed to fetch movies. Please try again.'
    };
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return {
      Title: '',
      Year: '',
      Rated: '',
      Released: '',
      Runtime: '',
      Genre: '',
      Director: '',
      Writer: '',
      Actors: '',
      Plot: '',
      Language: '',
      Country: '',
      Awards: '',
      Poster: '',
      Ratings: [],
      Metascore: '',
      imdbRating: '',
      imdbVotes: '',
      imdbID: '',
      Type: '',
      Response: 'False',
      Error: 'Failed to fetch movie details. Please try again.'
    };
  }
};

// list of trending IMDb IDs
const TRENDING_IMDB_IDS = [
  'tt0111161', // The Shawshank Redemption
  'tt0068646', // The Godfather
  'tt0468569', // The Dark Knight
  'tt1375666', // Inception
  'tt0137523', // Fight Club
  'tt0109830', // Forrest Gump
  'tt0120737', // The Lord of the Rings: The Fellowship of the Ring
  'tt0133093', // The Matrix
  'tt0167260', // The Lord of the Rings: The Return of the King
  'tt0080684', // Star Wars: Episode V - The Empire Strikes Back
];

export const getTrendingMovies = async () => {
  try {
    const moviePromises = TRENDING_IMDB_IDS.map(id => getMovieDetails(id));
    const movies = await Promise.all(moviePromises);
    // Filter out any failed fetches
    return movies.filter(movie => movie && movie.Response === 'True');
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
