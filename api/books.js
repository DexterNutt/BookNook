const path = require("path");
const fs = require("fs");
const Papa = require("papaparse");

const booksJson = require("./data/books.json");
const csvFilePath = path.join(__dirname, "data/books.csv");

let mergedBooks = [];

const mergeBooks = () => {
  try {
    const csvData = fs.readFileSync(csvFilePath, "utf-8");
    const parsedCSV = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    const booksCsv = parsedCSV.data.map((book) => ({
      id: Number(book.id),
      title: book.title,
      author: book.author,
      genre: book.genre,
    }));

    const bookMap = new Map();
    booksJson.forEach((jsonBook) => bookMap.set(jsonBook.id, jsonBook));
    booksCsv.forEach((csvBook) => bookMap.set(csvBook.id, csvBook));

    mergedBooks = Array.from(bookMap.values());
  } catch (error) {
    console.error("Error while parsing and merging:", error);
  }
};

mergeBooks();

module.exports = (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

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

    return res.status(200).json(foundBooks);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error searching for books in the library" });
  }
};
