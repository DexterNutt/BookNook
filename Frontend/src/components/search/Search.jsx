import React, { useState } from "react";
import { SortDropdown } from "../sortDropdown/SortDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";

export const Search = ({ onSearch, sortValue, onSortChange }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__bar">
        <div className="search__bar-container">
          <SortDropdown value={sortValue} handleChange={onSortChange} />
          <input
            className="search__input"
            type="text"
            placeholder="Search the library..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FontAwesomeIcon className="search__icon" icon={faMagnifyingGlass} />
        </div>
      </div>
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
};
