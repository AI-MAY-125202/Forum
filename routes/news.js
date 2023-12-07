var express = require('express');
var router = express.Router();
var db = require('./dbconnect');
var multer = require('multer')
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  var upload = multer({ storage: storage });

router.post('/create', upload.single('image'), function (req, res) {
  const {idTopic, type, content} = req.body
  var query = 'INSERT INTO news (idTopic, type, content, image, created_at) VALUES (?, ?, ?, ?, NOW())';
  // Lưu đường dẫn của ảnh vào cơ sở dữ liệu
  db.query(query, [idTopic,type,content, req.file.filename], function (err, result) {
      if (err) {
          res.status(500).send('Lỗi: ' + err);
        } else {
          res.status(200).json(result);
        }
      })
});

module.exports = router;