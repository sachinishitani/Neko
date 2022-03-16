var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Nekosan = require('../models/nekosans');
const db = require('../models/index');
const Sequelize = require('sequelize');


//このページにきたとき
router.get('/', (req, res, next) => {

  //ログインしていない＝req.session.loginは存在しない
  if (!req.session.login) {
    db.Nekosan.findByPk(req.query.id)
    .then(nekosan => {
      var data = {
        title: "ねこさん",//タイトル
        username:"未ログイン",//ヘッダーで表示させる名前
        form: nekosan
      }
      res.render('edit', data);
    })
  //ログイン済（req.session.loginが存在する）場合はユーザーネームを表示させる
  } else {
    db.Nekosan.findByPk(req.query.id)
    .then(nekosan => {
      var data = {
        title: "ねこさん",
        username:req.session.login.username,
        form: nekosan
      }
      res.render('edit', data);
  })
 }
});

//コネクションの用意
//var connection = mysql.createConnection(mysql_setting);
//データベースに接続
//connection.connect();
//idがとれているか
//console.log(req.params.id);
//データを取り出す
//connection.query('SELECT * from nekos where id = ?', id,
//function (error, results, fields) {
//データベースアクセス完了時の処理
//if (error == null) {
// var data = {
//  title: 'edit',
// content:results[0]
//}
//console.log(data);
//res.render('edit', data);
// }
//});
//接続を解除
//connection.end();
//});

/////////////////////////////////////////////////

//データの更新処理
router.post('/update', (req, res, next) => {
  console.log("コレコレ");
  console.log(req.body.id);

db.Nekosan.findByPk(req.body.id)

  .then(nekosan => {
    nekosan.name = req.body.name;
    nekosan.age = req.body.age;
    nekosan.neko_picture = req.body.neko_picture;
    nekosan.food = req.body.food;
    nekosan.personality = req.body.personality;
    nekosan.favoriteToys = req.body.favoriteToys;
    nekosan.favoriteSnack = req.body.favoriteSnack;
    nekosan.save().then(() => res.redirect('/other'));
  });
});

//データベースの設定情報
//var connection = mysql.createConnection(mysql_setting);
//データベースに接続
//connection.connect();
//データを更新する
//console.log(data);
//connection.query('update nekos set ? where id = ?', [data, id], function (error, results, fields) {
//  res.redirect('/other');
// });
//接続を解除
//connection.end();
//});

module.exports = router;
