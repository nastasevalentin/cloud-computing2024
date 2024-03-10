const http = require('http');
const url = require('url');
const { Client } = require('pg');

const books = {};

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'cloud'
});

client.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const reqUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const id = path.split('/').pop();
    if (req.method === 'GET' && path === '/books') {
        client.query('SELECT * FROM books', (err, result) => {
          if (err) {
            console.error(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
            return;
          }
      
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result.rows));
        });
      }else
    if (req.method === 'GET' && reqUrl.pathname.startsWith('/book/')) {
        // Extract the id from the path
        const id = reqUrl.pathname.split('/')[2];
    
        // Fetch the book data from the database
        const sql = 'SELECT * FROM books WHERE id = $1';
        const values = [id];
        client.query(sql, values, (err, result) => {
          if (err) {
            console.error(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
            return;
          }
    
          if (result.rows.length > 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result.rows[0]));
          } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Book not found' }));
          }
        });
    } else 
    if (req.method === 'POST' && path.startsWith('/book/')) {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const bookData = JSON.parse(body);
  
          if (!('id' in bookData && 'title' in bookData && 'author' in bookData && 'published_date' in bookData && 'pages' in bookData)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Please provide all the attributes: id, title, author, published_date, pages' }));
            return;
          }
  
          // Save book data to PostgreSQL database
          const sql = 'INSERT INTO books(id, title, author, published_date, pages) VALUES($1, $2, $3, $4, $5)';
          const values = [bookData.id, bookData.title, bookData.author, bookData.published_date, bookData.pages];
          client.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
                return;
            }
            console.log('Book data saved to database');
        
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Book data saved successfully' }));
        });
        } catch (error) {
          console.error(error);
          res.statusCode = 400;
          res.end(JSON.stringify({ message: 'Invalid JSON' }));
        }
      });
    } 
    else if (req.method === 'DELETE' && path.startsWith('/book/')) {
      const id = reqUrl.pathname.split('/')[2];
  
      // Delete the book data from the database
      const sql = 'DELETE FROM books WHERE id = $1';
      const values = [id];
      client.query(sql, values, (err, result) => {
          if (err) {
              console.error(err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Internal Server Error' }));
              return;
          }
  
          if (result.rowCount > 0) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Book deleted successfully' }));
          } else {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Book not found' }));
          }
      });
  }
  else if (req.method === 'DELETE' && path === '/books') {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Unauthorized' }));
}

else if (req.method === 'PUT' && path.startsWith('/book/')) {
  let id = path.split('/')[2]; // Extract the ID from the URL
  console.log(id);
  let body = '';

  req.on('data', chunk => {
      body += chunk.toString(); // Convert Buffer to string
  });

  req.on('end', () => {
      let book = JSON.parse(body); // Parse the JSON body

      let sql = 'UPDATE books SET title = $1, author = $2, published_date = $3 WHERE id = $4';
      let values = [book.title, book.author, book.published_date, id];

      client.query(sql, values, (err, result) => {
          if (err) {
              console.error(err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Internal Server Error' }));
              return;
          }

          if (result.rowCount > 0) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Book updated successfully' }));
          } else {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Book not found' }));
          }
      });
  });
}
else if (req.method === 'POST' && path === '/movie') {
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString();
  });
  req.on('end', () => {
      try {
          const movieData = JSON.parse(body);

          if (!movieData.id || !movieData.title || !movieData.director || !movieData.year) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Please provide all the attributes: id, title, director, year' }));
              return;
          }

          // Save movie data to PostgreSQL database
          const sql = 'INSERT INTO movies(id, title, director, year) VALUES($1, $2, $3, $4)';
          const values = [movieData.id, movieData.title, movieData.director, movieData.year];
          client.query(sql, values, (err, result) => {
              if (err) {
                  console.error(err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ message: 'Internal Server Error' }));
                  return;
              }
              console.log('Movie data saved to database');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Movie data saved successfully' }));
          });
      } catch (error) {
          console.error(error);
          res.statusCode = 400;
          res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
  });
}
else if (req.method === 'PUT' && path === '/movie') {
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString();
  });
  req.on('end', () => {
      try {
          const movieData = JSON.parse(body);

          if (!movieData.id || !movieData.title || !movieData.director || !movieData.year) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Please provide all the attributes: id, title, director, year' }));
              return;
          }

          // Update movie data in PostgreSQL database
          const sql = 'UPDATE movies SET title = $1, director = $2, year = $3 WHERE id = $4';
          const values = [movieData.title, movieData.director, movieData.year, movieData.id];
          client.query(sql, values, (err, result) => {
              if (err) {
                  console.error(err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ message: 'Internal Server Error' }));
                  return;
              }

              if (result.rowCount > 0) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ message: 'Movie updated successfully' }));
              } else {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ message: 'Movie not found' }));
              }
          });
      } catch (error) {
          console.error(error);
          res.statusCode = 400;
          res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
  });
}
    else {
      res.statusCode = 404;
      res.end();
    }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});