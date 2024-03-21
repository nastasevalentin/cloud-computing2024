const http = require("http");
const url = require("url");
const handleBookRequest = require("./books");
const handleMovieRequest = require("./movies");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.writeHead(200);
    res.end();
    return;
  }
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path.startsWith("/books")) {
    handleBookRequest(req, res);
  } else if (path.startsWith("/movies")) {
    handleMovieRequest(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
