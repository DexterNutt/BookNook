const express = require("express");
const cors = require("cors");
const books = require("./data/handler");

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/v1/books", books.findBooks);

app.listen(port, (error) => {
  if (error) {
    console.error("Search service could not e initiated!");
  }
  console.log(`Search service running on port ${port}`);
});
