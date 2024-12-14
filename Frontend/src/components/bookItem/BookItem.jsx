import React from "react";
import "./BookItem.css";

export const BookItem = ({ book, query }) => {
  const { title, author, genre } = book;

  const highlightText = (text, query) => {
    // function to see which part of the text in the book details matches to the query
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    // then add a strong HTML tag to exact matches
    return parts.map((part, index) =>
      regex.test(part) ? (
        <strong key={index} className="highlight">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  // finally render the book with the highlighted text
  return (
    <li className="book-item">
      <h3 className="book-item__title"> {highlightText(title, query)}</h3>
      <p className="book-item__author">{highlightText(author, query)}</p>
      <p className="book-item__genre"> {highlightText(genre, query)}</p>
    </li>
  );
};
