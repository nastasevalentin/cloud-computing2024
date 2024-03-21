const express = require("express");
const bodyParser = require("body-parser");
const booksRouter = require("./booksRouter");
const moviesRouter = require("./moviesRouter");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/books", booksRouter);
app.use("/movies", moviesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
