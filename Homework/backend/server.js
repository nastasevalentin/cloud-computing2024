const express = require("express");
const bodyParser = require("body-parser");
const booksRouter = require("./booksRouter");
const moviesRouter = require("./moviesRouter");
const stephenKingBooksRouter = require("./stephenBooksRouter");
const randomBookApi = require("./randomBookApi");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/books", booksRouter);
app.use("/movies", moviesRouter);
app.use("/stephen-king-books", stephenKingBooksRouter);
app.use("/random", randomBookApi);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
