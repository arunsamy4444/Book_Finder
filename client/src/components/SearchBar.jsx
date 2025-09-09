import React, { useState } from "react";
import "../styles/SearchBar.css";

function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState(""); // Track input value

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return; // Ignore empty searches
    onSearch(query); // Call parent search function
  };
  // Clear input and notify parent
  const handleClear = () => {
    setQuery("");
    if (onClear) onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a book..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="button-group">
        {query && (
          <button type="button" className="clear-button" onClick={handleClear}>
            ×
          </button>
        )}
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
