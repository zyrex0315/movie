import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MoviesProvider } from './context/MoviesContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
// import FavoritesPage from './pages/FavoritesPage';
import './index.css';

export function App() {
  return (
    <Router>
      <MoviesProvider>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="pt-4 pb-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
            </Routes>
          </main>
        </div>
      </MoviesProvider>
    </Router>
  );
}

export default App;
