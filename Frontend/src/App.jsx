import React, { useState, useEffect } from "react";
import { Search } from "./components/search/Search";
import { BookList } from "./components/booklist/BookList";
import { searchQuery } from "./api/searchApi";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [sortOption, setSortOption] = useState("author");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const results = await searchQuery(query);
        setBooks(results);
        console.log("RESULT", results);
      } catch (error) {
        setError("Failed to load books. Please try again later.");
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async (query) => {
    try {
      setQuery(query);
      setIsSearching(true);
      setError("");

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading

      const results = await searchQuery(query);

      if (results.length === 0) {
        setError("No results found");
        setBooks([]);
      } else {
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
