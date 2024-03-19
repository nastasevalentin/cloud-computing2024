const { Client } = require('pg');

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

module.exports = { client };