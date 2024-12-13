import React from "react";
import "./BookList.css";
import { BookItem } from "../bookItem/BookItem";

export const BookList = ({ books, query }) => {
  if (books.length === 0) {
    return <p className="book-list__no-results">No results found.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} query={query} />
      ))}
    </ul>
  );
};
