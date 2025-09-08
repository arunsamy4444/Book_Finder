import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import './App.css'

export default function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 15; 

  const fetchBooks = async (query) => {
    try {
      setError("");
      setLoading(true);
      setCurrentPage(1); // reset page on new search
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();

      if (data.docs.length === 0) {
        setError("No results found");
        setBooks([]);
      } else {
        setBooks(data.docs);
      }
    } catch (err) {
      setError("Something went wrong");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

    // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);


  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Finder</h1>
      </header>
      
      <div className="search-container">
        <SearchBar onSearch={fetchBooks} />
      </div>
      
      {loading && <p className="loading">Searching for books...</p>}
      {error && <p className="error-message">{error}</p>}
      
      <div className="book-list-container">
        <BookList books={currentBooks} />
      </div>
      
      {/* Pagination Controls */}
      {books.length > booksPerPage && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {books.length === 0 && !loading && !error && (
        <p className="no-results">Search for books to get started!</p>
      )}
    </div>
  );
}