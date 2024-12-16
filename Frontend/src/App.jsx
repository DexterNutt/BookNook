import React, { useState, useEffect } from "react";
import { Search } from "./components/search/Search";
import { BookList } from "./components/booklist/BookList";
import { searchQuery } from "./api/searchApi";
import useDebounce from "./components/hooks/useDebounce";

import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  // const [isSearching, setIsSearching] = useState(false);
  const [sortOption, setSortOption] = useState("author");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // setIsSearching(true);
        setError("");

        if (debouncedQuery === "") {
          setBooks([]);
          return;
        }

        const results = await searchQuery(debouncedQuery);

        if (results.length === 0) {
          setError("No results found");
          setBooks([]);
        } else {
          setBooks(results);
          setError("");
        }
      } catch (error) {
        setError(
          "Our Librarian is on a break, please try again in a few minutes."
        );
        setBooks([]);
      } finally {
        // setIsSearching(false);
      }
    };

    fetchBooks(debouncedQuery);
  }, [debouncedQuery]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortedBooks = [...books].sort((bookA, bookB) => {
    const bookA_Comparison = bookA[sortOption].toLowerCase();
    const bookB_Comparison = bookB[sortOption].toLowerCase();
    return bookA_Comparison.localeCompare(bookB_Comparison);
  });

  return (
    <div className="app">
      <h1 className="app__title">Book Nook</h1>

      <Search
        sortValue={sortOption}
        onSortChange={handleSortChange}
        onChange={handleSearch}
      />

      {error && <p className="error-message">{error}</p>}

      <BookList books={sortedBooks} query={query} />
    </div>
  );
};

export default App;
