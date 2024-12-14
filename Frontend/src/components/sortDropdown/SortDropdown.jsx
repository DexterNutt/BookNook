import React from "react";
import "./SortDropdown.css";

export const SortDropdown = ({ value, handleChange }) => {
  return (
    <div className="sort-dropdown">
      <select
        id="sort-options"
        className="sort-dropdown__select"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="author">Author Name</option>
        <option value="title">Title</option>
        <option value="genre">Genre</option>
      </select>
    </div>
  );
};
