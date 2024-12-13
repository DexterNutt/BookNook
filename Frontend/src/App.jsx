import React, { useState } from "react";
import { Search } from "./components/search/Search";
import { BookList } from "./components/booklist/BookList";
import { searchQuery } from "./api/searchApi";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    try {
      setQuery(query);
      setIsSearching(true);
      setError("");

      const results = await new Promise((res) => {
        setTimeout(async () => {
          const queryResult = await searchQuery(query);
          res(queryResult);
        }, 750);
      }); // Send the query to the api with a timeout function to show the loading

      if (results.length === 0) {
        // First check if the server finds something, if not set error
        setError("No results found.");
        setBooks([]);
      } else {
        // If it found something, update state
        setBooks(results);
        setError("");
      }
    } catch (error) {
      setError("Failed to fetch books.");
      setBooks([]);
      setIsSearching(false);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">Search the Library</h1>
      <Search onSearch={handleSearch} />
      {isSearching && <p className="spinner">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <BookList books={books} query={query} />
    </div>
  );
};

export default App;
