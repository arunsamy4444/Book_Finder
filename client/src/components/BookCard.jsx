import React from "react";
import "../styles/BookCard.css";

function BookCard({ book }) {
  // Determine cover image URL or use placeholder
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  // Link to book page on Open Library
  const bookUrl = `https://openlibrary.org${book.key}`;

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} className="book-cover" />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="book-year">{book.first_publish_year || "N/A"}</p>
      <a
        href={bookUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "10px",
          padding: "6px 12px",
          backgroundColor: "#001d85",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
          fontSize: "0.9rem",
          transition: "background 0.2s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#004f59")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007185")}
      >
        View Book
      </a>
    </div>
  );
}

export default BookCard;
