import React, { useState } from "react";
import { Search } from "./components/search/Search";
import { BookList } from "./components/booklist/BookList";
import { searchQuery } from "./api/searchApi";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      setQuery(query);
      const results = await searchQuery(query);
      setBooks(results);
      setError(null);
    } catch (error) {
      setError("Failed to fetch books.");
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">Search the Library</h1>
      <Search onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>}
      <BookList books={books} query={query} />
    </div>
  );
};

export default App;
