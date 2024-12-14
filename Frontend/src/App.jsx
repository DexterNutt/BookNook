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

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a longer search...

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

  return (
    <div className="app">
      <h1 className="app__title">Search the Library</h1>
      <Search onSearch={handleSearch} />
      {isSearching && <p className="spinner">Searching the Library...</p>}
      {error && <p className="error-message">{error}</p>}
      <BookList books={books} query={query} />
    </div>
  );
};

export default App;
