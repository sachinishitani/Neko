var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../models/user');

//このページに来た時
router.get('/', (req, res, next) => {
 console.log("こっち");
  db.User.findAll().then(User => {
    console.log(User);
  });
  // 宣言
  let username;
  // ログイン済かログインしていないかで表示の名前を変更する
  // ログインしていない＝req.session.loginが存在しない
  if (!req.session.login){
    username = '未ログイン';
  } else {
    username = req.session.login.username;
  };

  res.render('signup',{title:'新規登録',username:username}
  )
});

//////////////////////////////////////////////
  //新規登録処理
  router.post('/post', (req, res, next) => {
    console.log('にゃんぱすー');
    db.sequelize.sync()
      .then(() => db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }))
    .then(User => {
      res.redirect('/other')
   });
});
/////////////////////////////////////////////
//ログインする
//router.get('/login', (req, res, next) => {
//  console.log('ろぐいん');
//  var data = {
//    title:'Users/Login',
//    content:'名前とパスワードをいれてね'
//  }
//  res.render('signup/login', data);
//});
//////////////////////////////////////////////

//router.post('/login', (req, res, next) => {
//  console.log('ろぐいん2');
//db.User.findOne({
//  where:{
//    username:req.body.username,
//    email: req.body.email,
//    password:req.body.password
//  }/

//}).then(user=>{
//  if(user != null) {
//    req.session.login = user;
//    console.log(req.session.login);
//    let back = req.session.back;
//    if(back == null){
//     back = '/other';
//    }
//    res.redirect(back);
//  } else {
//    var data = {
//      title:'ログイン',
//      content:'名前かパスワードに問題がありますよ～～'
//    }
//    res.render('hello', data);
//  }
//});
//});


module.exports = router;