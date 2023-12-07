var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('./dbconnect');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
  
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length > 0) {
        const token = jwt.sign({ username }, '123456', { expiresIn: '1h' });
        return res.json({ token });
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    });
});

router.post('/nopassword', (req, res) => {
    const { username, name } = req.body;

    if (!username || !name) {
      return res.status(400).json({ message: 'Username and name are required' });
    }
  
    const query = 'SELECT * FROM user WHERE username = ?';
  
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length > 0) {
        req.session.user = name;
        return res.json({ name });
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    });
});

module.exports = router;