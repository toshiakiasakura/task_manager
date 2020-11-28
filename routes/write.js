var express = require('express');
var sqlite3 = require('sqlite3');
var router = express.Router();

var db = new sqlite3.Database('./kadai.db');
router.get('/', (req, res, next) => res.render('write'));

router.post('/', (req, res, next) => {
    // 登録内容をフォームから引っこ抜く
    const kadai = req.body.kadai;
    const risou = req.body.risou;
    const gyappu = req.body.gyappu;
    const kaiketsu = req.body.kaiketsu;

    // DBに登録する
    db.run(
        'insert into kadaitable (kadai,risou,gyappu,kaiketsu) values (?, ?, ?, ?)',
        kadai,risou,gyappu,kaiketsu,
    );
    // 登録したら一覧に戻る
    res.redirect('/');
});

module.exports = router;
