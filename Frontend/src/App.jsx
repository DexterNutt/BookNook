import React, { useState } from "react";
import { Search } from "./components/search/Search";
import { BookList } from "./components/booklist/BookList";
import { SortDropdown } from "./components/sortDropdown/SortDropdown";
import { searchQuery } from "./api/searchApi";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [sortOption, setSortOption] = useState("author");

  const handleSearch = async (query) => {
    try {
      setQuery(query);
      setIsSearching(true);
      setError("");

      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second timeout function to simulate a longer search

      const results = await searchQuery(query); // Dispatch the query to the api

      if (results.length === 0) {
        // First check if the server finds something, if not set error and remove any previous found books
        setError("No results found");
        setBooks([]);
      } else {
        // If it found something, update state with the books
        setBooks(results);
        setError("");
      }
    } catch (error) {
      setError(
        "Our Librarian is on a break, please try again in a few minutes"
      );
      setBooks([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Sorting function to arrange the received books alphabetically
  const sortedBooks = [...books].sort((bookA, bookB) => {
    const bookA_Comparison = bookA[sortOption].toLowerCase();
    const bookB_Comparison = bookB[sortOption].toLowerCase();
    return bookA_Comparison.localeCompare(bookB_Comparison);
  });

  return (
    <div className="app">
      <h1 className="app__title">Book Nook</h1>

      <Search
        onSearch={handleSearch}
        sortValue={sortOption}
        onSortChange={handleSortChange}
      />

      {isSearching && <p className="spinner">Searching the Library...</p>}
      {error && <p className="error-message">{error}</p>}

      <BookList books={sortedBooks} query={query} />
    </div>
  );
};

export default App;
