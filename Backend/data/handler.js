const booksJson = require("./books.json");

exports.findBooks = async (req, res) => {
  try {
    const searchTerm = req.query.search;

    const foundBooks = await booksJson.find(searchTerm);

    if (foundBooks.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(mentors);
  } catch (error) {
    console.error("Error searching for mentors:", error);
    return res
      .status(500)
      .json({ message: "Error searching for mentors in database" });
  }
};
