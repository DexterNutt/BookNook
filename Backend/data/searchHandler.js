const fs = require("fs");
const Papa = require("papaparse");
const booksJson = require("./books.json");
const csvFilePath = "./data/books.csv";

let mergedBooks = [];

const mergeBooks = () => {
  try {
    // Read the CSV data with papaparse
    const csvData = fs.readFileSync(csvFilePath, "utf-8");
    const parsedCSV = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    // Set the csv data in an object
    const booksCsv = parsedCSV.data.map((book) => ({
      id: Number(book.id),
      title: book.title,
      author: book.author,
      genre: book.genre,
    }));

    // Compare the books in the JSON and parsedCSV objects in a Map dataset (if there are differences, it will add the missing books in the central bookMap)
    const bookMap = new Map();
    booksJson.forEach((jsonBook) => bookMap.set(jsonBook.id, jsonBook));
    booksCsv.forEach((csvBook) => bookMap.set(csvBook.id, csvBook));

    // Convert the map in an array
    mergedBooks = Array.from(bookMap.values());

    return mergedBooks;
  } catch (error) {
    console.error("Error while parsing and merging:", error);
  }
};

mergeBooks();

exports.findBooks = async (req, res) => {
  try {
    const searchTerm = req.query.search?.toLowerCase();

    const foundBooks = mergedBooks.filter(
      ({ title, author, genre }) =>
        title.toLowerCase().includes(searchTerm) ||
        author.toLowerCase().includes(searchTerm) ||
        genre.toLowerCase().includes(searchTerm)
    );

    if (foundBooks.length === 0) {
      return res.status(404).json({ message: "No books found!" });
    }

    res.status(200).json(foundBooks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error searching for books in the library" });
  }
};
