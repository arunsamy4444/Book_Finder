import React from "react";
import BookCard from "./BookCard";
import "../styles/BookList.css";

function BookList({ books }) {
  // Return nothing if books array is empty or undefined
  if (!books || books.length === 0) {
    return null; // no need to render empty div
  }

  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}

// Export for use in parent component
export default BookList;
