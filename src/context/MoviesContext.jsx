import React, { createContext, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';

const MoviesContext = createContext(undefined);

export const MoviesProvider = ({ children }) => {
  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorites();

  return (
    <MoviesContext.Provider 
      value={{ favorites, isFavorite, addFavorite, removeFavorite }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};
