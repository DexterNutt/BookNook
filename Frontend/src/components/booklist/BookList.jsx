import React from "react";
import "./BookList.css";
import { BookItem } from "../bookItem/BookItem";

export const BookList = ({ books, query }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} query={query} />
      ))}
    </ul>
  );
};
