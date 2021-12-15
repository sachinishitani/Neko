var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const { check, validationResult } = require('express-validator');

var mysql_setting = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'neko'
};

//ページ取得
router.get('/',(req, res) => {
    var data = {
        title: 'kokoko',
        content: 'nakami'
    };
    res.render('login', data);
});

//データベースの設定情報
var connection = mysql.createConnection(mysql_setting);
//データベースに接続
connection.connect();

router.post('/post', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log("きてます～～？");

    connection.query(
        'insert into users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        (error, results) => {
        req.session.userId = results.insertId;
        req.session.username = username;
        res.redirect('/other');
    }
    );


    //接続を解除
    connection.end();

});



module.exports = router;