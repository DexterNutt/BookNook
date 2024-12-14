import React, { useState } from "react";
import { SortDropdown } from "../sortDropdown/SortDropdown";
import "./Search.css";

export const Search = ({ onSearch, sortValue, onSortChange }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__container">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search the library..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SortDropdown value={sortValue} handleChange={onSortChange} />
      </div>
      <button className="search-bar__button" type="submit">
        Search
      </button>
    </form>
  );
};
