var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Nekosan = require('../../models/nekosans');
const db = require('../../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//このページに来た時
router.get('/', (req, res, next) => {
  console.log("ボードgetきてます",req.session.login)
  // ログインしていない＝req.session.loginは存在しない
  if (!req.session.login) {
    db.Nekosan.findAll().then(Nekosan => {
      var data = {
        title: "猫さんたち", //タイトル
        username:"未ログイン", // ヘッダーで表示させる名前
        content: Nekosan //登録されている全猫ちゃん
      }
      res.redirect('../index');
    })

  //テーブルを結合する
  //SELECT *
  //FROM nekosan
  //JOIN users
  //ON nekosan.user_id = users.id;

  //ユーザーごとのねこさん
  //SELECT nekosan.name
  //FROM nekosan
  //JOIN users
  //ON nekosan.user_id = users.id
  //WHERE nekosan.user_id = 60;
  //nekosanテーブルのuser_id = usersテーブルのid= session.loginの猫さんをだす。

  // ログイン済（req.session.loginが存在する）の場合はユーザーネームを表示させる
  } else {
    db.Nekosan.findAll({ where: { user_id: [req.session.login.id] } }).then(Nekosan => {
      var data = {
        title: "猫さんたち",
        username:req.session.login.username,
        content: Nekosan
      }
      res.render('board/boards', data );
    })
  }
});
//router.get('/', function(req, res, next) {
//  console.log("ボールぺん",req.session.login);
//  let username;
//  if (!req.session.login){
//    username = '未ログイン';
//    } else {
//    username = req.session.login.username;
//  };
//  res.render('board/boards',{username:username});
//  });

module.exports = router;
