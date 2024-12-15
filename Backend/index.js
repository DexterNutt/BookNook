const express = require("express");
const cors = require("cors");
const books = require("./data/searchHandler");
const BOOK_NOOK_PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/v1/books", books.findBooks);

app.listen(BOOK_NOOK_PORT, (error) => {
  if (error) {
    console.error("Search service could not e initiated!");
  }
  console.log(`Search service running on port ${BOOK_NOOK_PORT}`);
});
