import React, { useState } from "react";
import "./Search.css";

export const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search the library..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-bar__button" type="submit">
        Search
      </button>
    </form>
  );
};
