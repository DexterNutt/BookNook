import React from "react";
import "./BookItem.css";

export const BookItem = ({ book, query }) => {
  const { title, author, genre } = book;

  const highlightText = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

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

  return (
    <li className="book-item">
      <h3 className="book-item__title"> {highlightText(title, query)}</h3>
      <p className="book-item__author">{highlightText(author, query)}</p>
      <p className="book-item__genre"> {highlightText(genre, query)}</p>
    </li>
  );
};
