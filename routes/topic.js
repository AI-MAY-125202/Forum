var express = require('express');
var router = express.Router();
var db = require('./dbconnect');

// getalldata
router.get('/getselect', function (req, res) {
    var query = "select * from topic";
    db.query(query, function (err, result) {
        if (err) res.status(500).send('Lỗi: ' + err);
        res.json(result);
    })})
router.post('/create', function (req, res) {
    var query = 'insert into topic (name) values (?)';
    var data = 'select * from topic where id = last_insert_id()';
    db.query(query,[req.body.name], function (err, result) {
        if (err) res.status(500).send('Lỗi: ' + err);
        res.json(data[0]);
    });
});

module.exports = router;
