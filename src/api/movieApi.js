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
  'tt15398776', // Oppenheimer
  'tt6710474', // Everything Everywhere All at Once
  'tt10648342', // Top Gun: Maverick
  'tt9419884', // Doctor Strange in the Multiverse of Madness
  'tt10872600', // Spider-Man: No Way Home
  'tt10298810', // Lightyear
  'tt10838180', // The Matrix Resurrections
  'tt9032400', // Eternals
  'tt1160419', // Dune
  'tt10872600', // Spider-Man: No Way Home
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
