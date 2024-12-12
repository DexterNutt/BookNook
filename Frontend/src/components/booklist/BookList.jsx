import React from "react";
import "./BookList.css";

export const BookList = ({ books }) => {
  if (books.length === 0) {
    return <p className="no-results">No results found.</p>;
  }

  return (
    <ul className="book-list">
      {books.map(({ id, title, author, genre }) => (
        <li key={id} className="book-list__item">
          <h3 className="book-list__title">{title}</h3>
          <p className="book-list__author">
            <strong>Author:</strong> {author}
          </p>
          <p className="book-list__genre">
            <strong>Genre:</strong> {genre}
          </p>
        </li>
      ))}
    </ul>
  );
};
