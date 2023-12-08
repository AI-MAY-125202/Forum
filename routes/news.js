var express = require('express');
var router = express.Router();
var db = require('./dbconnect');
var path = require('path');
var public = (path.join(__dirname, '../public/images/'));

router.post('/create', (req, res) => {
  const { idTopic, idUser, type, content } = req.body;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  
  const image = req.files.files;
  const fileName = Date.now() + path.extname(image.name);

  image.mv(public + fileName, (err) => {
      if (err) {
          return res.status(500).send('Error uploading file: ' + err);
      }

      const query = 'INSERT INTO news (idTopic, idUser, type, content, image, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
      db.query(query, [idTopic, idUser, type, content, fileName], (err, result) => {
          if (err) {
              return res.status(500).send('Error inserting data into the database: ' + err);
          }

          res.json(result);
      });
  });
});

router.get('/getall', function (req, res) {
  var query = `select user.id, user.username, user.image as avatar, topic.name as topicname, news.* from topic
              inner join news on topic.id = news.idTopic
              inner join user on news.idUser = user.id`;
  db.query(query, function (err, result) {
      if (err) res.status(500).send('Lỗi: ' + err);
      res.json(result);
  });
});

module.exports = router;