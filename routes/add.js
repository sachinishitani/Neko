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

//コネクションの用意
var connection = mysql.createConnection(mysql_setting);

//データベースに接続
connection.connect();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('add', { title: '猫さん登録画面作ってみましたよ' ,
    content: '内容でてます～？でてます””',
    form: req.body});
  });

router.get('/', function (req, res, next) {


//データを取り出す
connection.query('SELECT * from nekos',
  function (error, results, fields) {
    //データベースアクセス完了時の処理
    if (error == null) {
      var data = {
        title: 'add',
        content: results
      };
      res.render('add', data)
    }
  });
//接続を解除
connection.end();
});


//新規作成ページへのアクセス
router.get('/post', (req, res, next) => {
    var data = {
      title: 'Add',
      content: '新しいレコードを入力',
      form: {name:'', age:0}
    }
    res.render('add', data);
  });

  //新規作成フォーム送信の処理
  router.post('/post', [
    check('name','名前 は必ず入力してください。').notEmpty(),
    check('age','AGE は年齢（整数）を入れてください。').isInt()
  ], (req, res, next) => {

    const errors = validationResult(req);

    console.log("ねこねこ");
    if (!errors.isEmpty()) {
      console.log('if');
      var result = '<ul class="text-danger">';
      var result_arr = errors.array();
      for(var n in result_arr) {
        result += '<li>' + result_arr[n].msg + '</li>'
      }
      result += '<ul>';
      var data = {
        title: 'Add',
        content: result,
        form: req.body
      }
      res.render('add', data);
    } else {
      console.log('else');
      var nm = req.body.name;
      var ag = req.body.age;
  
    console.log('てすと');
    var data = {
      'name': nm,
      'age': ag,
      'food': req.body.food,
      'personality': req.body.personality,
      'favoriteToys': req.body.favoriteToys,
      'favoriteSnack': req.body.favoriteSnack
    };

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);
    //データベースに接続
    connection.connect();

    //データを登録する
    connection.query('insert into nekos set ?', data, function (error, results, fields) {
      res.redirect('/add');
    });
    //接続を解除
    connection.end();
  }
  });
  module.exports = router;