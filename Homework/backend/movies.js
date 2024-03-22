const { client } = require('./database');
const url = require('url');

module.exports = function handleMovieRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const id = path.split('/').pop();
    const reqUrl = url.parse(req.url, true);


    if (req.method === 'POST' && path === '/movies') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const movieData = JSON.parse(body);

            if (!movieData.title || !movieData.director || !movieData.year) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Please provide all the attributes: id, title, director, year' }));
              return;
            }

            const sql = 'INSERT INTO movies(title, director, year) VALUES($1, $2, $3)';
            const values = [movieData.title, movieData.director, movieData.year];
            if (!('title' in movieData && 'director' in movieData && 'year' in movieData)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Please provide all the attributes: title, director, year' }));
              return;
            }
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
      else if (req.method === 'PUT' && path.startsWith('/movies/')) {
        let id = path.split('/')[2];
        console.log(id);
        let body = '';

        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', () => {
          let movie = JSON.parse(body);

          let sql = 'UPDATE movies SET title = $1, director = $2, year = $3 WHERE id = $4';
          let values = [movie.title, movie.director, movie.year, id];

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
        });
      }
      else if (req.method === 'GET' && path === '/movies') {
        let sql = 'SELECT * FROM movies';

        client.query(sql, (err, result) => {
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
      }
      else if (req.method === 'GET' && reqUrl.pathname.startsWith('/movies/')) {
        const id = reqUrl.pathname.split('/')[2];

        const sql = 'SELECT * FROM movies WHERE id = $1';
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
      }
      else {
        res.statusCode = 404;
        res.end();
      }
};