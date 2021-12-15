var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'neko'
};

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('deleted', { title: 'でりーと' ,
    content:  results});
  });


//削除フォームの送信処理
//router.post('/deleted', (req, res, next) => {
//  var id = req.body.id;

  //データベースの設定情報
 // var connection = mysql.createConnection(mysql_setting);
  //データベースに接続
 // connection.connect();
  //データを削除する
  //connection.query('delete from nekos where id = ?', id, function (error, results, fields) {
  //  res.redirect('/');
  //});
  //接続を解除
  //connection.end();
//});

module.exports = router;
