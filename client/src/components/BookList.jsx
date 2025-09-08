import React from "react";
import BookCard from "./BookCard";
import "../styles/BookList.css";

function BookList({ books }) {
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

export default BookList;
