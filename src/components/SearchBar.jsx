import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full py-3 px-12 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-12 pr-3 flex items-center text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-4 bg-red-600 hover:bg-red-700 text-white rounded-r-full transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
