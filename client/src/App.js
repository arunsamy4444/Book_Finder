import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import "./App.css";

// ✅ Import react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [books, setBooks] = useState([]); // Store fetched books
  const [error, setError] = useState(""); // Store fetch error messages
  const [loading, setLoading] = useState(false); // Loading state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 15;

  // Fetch books from Open Library API
  const fetchBooks = async (query) => {
    try {
      setLoading(true);
      setCurrentPage(1); // reset page on new search

      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();

      if (data.docs.length === 0) {
        setBooks([]);
        // ✅ Show toast if no results
        toast.warning("No results found!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } else {
        setBooks(data.docs);
      }
    } catch (err) {
      setBooks([]);
      toast.error("Something went wrong!", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic: slice current page of books
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
          <span>
            {" "}
            Page {currentPage} of {totalPages}{" "}
          </span>
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

      {/* ✅ Toast container */}
      <ToastContainer />
    </div>
  );
}
