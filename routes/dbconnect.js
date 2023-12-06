const express = require('express');
const mysql = require('mysql2');

const app = express();

// Kết nối đến MySQL
const connection = mysql.createConnection({
  host: '103.146.23.127',
  user: 'hoangtamdb',
  password: 'Hoangtam@12345',
  database: 'forum'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = connection;