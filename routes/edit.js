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
router.get('/:id', (req, res, next) => {

  console.log("きてくれたのか～ここはえdeっと");

  var id = req.params.id;
  //コネクションの用意
  var connection = mysql.createConnection(mysql_setting);

  //データベースに接続
  connection.connect();
  //idがとれているか
  console.log(req.params.id);
  //データを取り出す

  connection.query('SELECT * from nekos where id = ?', id,
   function (error, results, fields) {
     //データベースアクセス完了時の処理
     if (error == null) {
       var data = {
         title: 'edit',
         content:results[0]
       }
       console.log(data);
       res.render('edit', data);
     }
   });

 //接続を解除
connection.end();
});

/////////////////////////////////////////////////

//編集フォーム送信の処理
router.post('/:id/update', (req, res, next) => {

  console.log("きてくれたのか～ここはえdeっとのポスト！！");

  var id = req.body.id;

  var data = {
    'name': req.body.name,
    'age': req.body.age,
    'food': req.body.food,
    'personality': req.body.personality,
    'favoriteToys': req.body.favoriteToys,
    'favoriteSnack': req.body.favoriteSnack
  };
  //データベースの設定情報
  var connection = mysql.createConnection(mysql_setting);
  //データベースに接続
  connection.connect();
  //データを更新する

  console.log(data);

  connection.query('update nekos set ? where id = ?', [data, id], function (error, results, fields) {
    res.redirect('/other');
  });
  //接続を解除
  connection.end();
});
//////////////////////////////



module.exports = router;
