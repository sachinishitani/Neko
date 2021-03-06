var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const passport = require('passport');
const User = require('../models/user');


//このページに来た時
router.get('/', (req, res, next) => {
  console.log("こっちはログイン画面のほう！");

  // 宣言
  let username;
  // ログイン済かログインしていないかで表示の名前を変更する
  // ログインしていない＝req.session.loginが存在しない
  if (!req.session.login){
    username = '未ログイン';
    res.render('login',{username:username})
  } else {
    username = req.session.login.username;
    res.render('index',{username:username})};
});

//////////////////////////////////////////////
//ログイン処理
router.post('/post', (req, res, next) => {

  console.log("ログインのPOST");
    db.User.findOne({where:{
        username:req.body.username,
        email: req.body.email,
        password:req.body.password
      }
    }).then( user=>{
      if(user != null) {
          req.session.login = user;
          console.log(req.session.login);
          let back = req.session.back;

          if(back == null){
            back = '/other';
          }
          res.redirect(back);
      } else {
        var data = {
          title:'ログイン',
          content:'名前かパスワードに問題がありますよ～～'
        }
        res.render('/', data);
      }
    });

});

//////////////////////////////////////////////

//router.post('/login', (req, res, next) => {
//  console.log('ろぐいん2');
//db.User.findOne({
//  where:{
//    username:req.body.username,
//    email: req.body.email,
//    password:req.body.password
//  }

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