const { client } = require('./database');
const url = require('url');


module.exports = function handleBookRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const id = path.split('/').pop();
  const reqUrl = url.parse(req.url, true);

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
  } else
    if (req.method === 'GET' && reqUrl.pathname.startsWith('/books/')) {
      const id = reqUrl.pathname.split('/')[2];

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
    } else if (req.method === 'POST' && path.startsWith('/books')) {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString(); 
      });
      req.on('end', () => {
        const book = JSON.parse(body); 
        const sql = 'INSERT INTO books (title, author, published_date, pages) VALUES ($1, $2, $3, $4)';
        const values = [book.title, book.author, book.published_date || null, book.pages || null];
        client.query(sql, values, (err, result) => {
          if (err) {
            console.error(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
            return;
          }
    
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Book created' }));
        });
      });
    }
      else if (req.method === 'DELETE' && path.startsWith('/books/')) {
        const id = reqUrl.pathname.split('/')[2];

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

      else if (req.method === 'PUT' && path.startsWith('/books/')) {
        let id = path.split('/')[2];
        console.log(id);
        let body = '';

        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', () => {
          let book = JSON.parse(body);

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
};