const booksJson = require("./books.json");

exports.findBooks = async (req, res) => {
  try {
    const searchTerm = req.query.search?.toLowerCase();

    const books = booksJson;

    const foundBooks = books.filter(
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
