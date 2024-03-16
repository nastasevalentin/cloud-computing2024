const http = require('http');
const url = require('url');
const handleBookRequest = require('./books');
const handleMovieRequest = require('./movies');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path.startsWith('/books')) {
    handleBookRequest(req, res);
  } else if (path.startsWith('/movies')) {
    handleMovieRequest(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});