import React, { useState, useRef, useEffect } from "react";
import "./SortDropdown.css";

export const SortDropdown = ({ value, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (selectedValue) => {
    handleChange(selectedValue);
    setSelectedSort(true);
    setIsOpen(false);
  };

  return (
    <div className="sort" ref={dropdownRef}>
      <div className="sort__selected" onClick={() => setIsOpen(!isOpen)}>
        {!selectedSort ? "SORT BY" : value.toUpperCase()}
      </div>
      {isOpen && (
        <ul className="sort__list">
          <li
            className="sort__item"
            onClick={() => handleOptionClick("author")}
          >
            Author Name
          </li>
          <li className="sort__item" onClick={() => handleOptionClick("title")}>
            Title
          </li>
          <li className="sort__item" onClick={() => handleOptionClick("genre")}>
            Genre
          </li>
        </ul>
      )}
    </div>
  );
};
