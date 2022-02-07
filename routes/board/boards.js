var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', (req, res, next) => {
//  res.render('index', {
// title: 'インデックス' ,
//  content: '眠いむい'});
//});
//console.log("ねこさん！！！！");

router.get('/', function(req, res, next) {
  console.log("ボールぺん",req.session.login);
  let username;
  if (!req.session.login){
    username = '未ログイン';
    } else {
    username = req.session.login.username;
  };

  res.render('board/boards',{username:username});
  });

module.exports = router;
