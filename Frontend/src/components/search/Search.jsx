import React, { useState } from "react";
import { SortDropdown } from "../sortDropdown/SortDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";

export const Search = ({ onChange, sortValue, onSortChange }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(query);
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onChange(newQuery);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__bar">
        <SortDropdown value={sortValue} handleChange={onSortChange} />
        <input
          className="search__input"
          type="text"
          placeholder="Search the library..."
          value={query}
          onChange={handleInputChange}
        />
        <button className="search__button" type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search__icon" />
        </button>
      </div>
    </form>
  );
};
