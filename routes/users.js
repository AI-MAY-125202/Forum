var express = require('express');
var router = express.Router();
var db = require('./dbconnect');

// getalldata
router.get('/', function (req, res) {
    var query = "select * from topic";
    db.query(query, function (err, result) {
        if (err) res.status(500).send('Lỗi: ' + err);
        res.status(200).json(result);
    });
});

module.exports = router;
