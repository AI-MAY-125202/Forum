var express = require('express');
var router = express.Router();
var db = require('./dbconnect');

router.post('/create', function (req, res) {
    var query = 'insert into topic (name) values (?)';
    db.query(query,[req.body.name], function (err, result) {
        if (err) res.status(500).send('Lỗi: ' + err);
        res.status(200).json(result);
    });
});