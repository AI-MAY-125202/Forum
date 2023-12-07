var express = require('express');
var router = express.Router();
var db = require('./dbconnect');

router.post('/create', function (req, res) {
    const { idParent, idNews, idUser, content } = req.body;
    var query = 'insert into answer (idParent, idNews, idUser, content, created_at) values (?, ?, ?, ?, NOW())';
    db.query(query,[idParent, idNews, idUser, content], function (err, result) {
        if (err) res.status(500).send('Lỗi: ' + err);
        res.status(200).json(result);
    });
});

router.get('/getnewanswer', function (req, res) {
    const { idParent, idNews, idUser } = req.body;
    var query = 'SELECT * FROM answer INNER JOIN user ON answer.idUser = user.id INNER JOIN news ON answer.idNews = news.id WHERE idParent = ? AND idUser = ? AND idNews = ?';
    db.query(query,[idParent, idNews, idUser], function (err, result) {
        if (err) res.status(500).send('Lỗi: ' + err);
        res.status(200).json(result);
    });
});

module.exports = router;