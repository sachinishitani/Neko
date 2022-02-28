var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Nekosan = require('../models/nekosans');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//var mysql_setting = {
//  host: 'localhost',
//  user: 'root',
//  password: '',
//  database: 'neko'
//};

//このページに来た時
router.get('/', (req, res, next) => {

  console.log("きてます",req.session.login)
  // ログインしていない＝req.session.loginは存在しない
  if (!req.session.login) {
    db.Nekosan.findAll().then(Nekosan => {
      var data = {
        title: "aza-", //タイトル
        username:"未ログイン", // ヘッダーで表示させる名前
        content: Nekosan //登録されている全猫ちゃん
      }
      res.redirect('index');
    })
  // ログイン済（req.session.loginが存在する）の場合はユーザーネームを表示させる
  } else  {
    db.Nekosan.findAll().then(Nekosan => {
      var data = {
        title: "aza-",
        username:req.session.login.username,
        content: Nekosan
      }
      res.render('other', data );
    })
  }
});

//デリート処理
router.post('/delete', (req, res, next) => {

  console.log("とても眠いぽすと");
  db.Nekosan.findByPk(req.body.id)
  .then(Nekosan => {
    Nekosan.destroy().then(() => res.redirect('/other'));
  })
  console.log("消えてます？");
});

module.exports = router;
