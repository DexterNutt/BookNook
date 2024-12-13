import React from "react";
import "./BookItem.css";

export const BookItem = ({ book, query }) => {
  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: "bold", color: "red" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const { title, author, genre } = book;

  return (
    <li className="book-item">
      <h3 className="book-item__title">{highlightText(title, query)}</h3>
      <p className="book-item__author">{highlightText(author, query)}</p>
      <p className="book-item__genre">{highlightText(genre, query)}</p>
    </li>
  );
};
