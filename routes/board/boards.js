var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Board = require('../../models/board');
const db = require('../../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//このページに来た時
router.get('/', (req, res, next) => {
  console.log("ボードgetきてます",req.session.login)
  // ログインしていない＝req.session.loginは存在しない
  if (!req.session.login) {
    db.Board.findAll().then(Board => {
      var data = {
        title: "board", //タイトル
        username:"未ログイン", // ヘッダーで表示させる名前
        content: Board //登録されている全猫ちゃん
      }
      res.redirect('../index');
    })
  // ログイン済（req.session.loginが存在する）の場合はユーザーネームを表示させる
  } else  {
    db.Board.findAll().then(Board => {
      var data = {
        title: "board",
        username:req.session.login.username,
        content: Board
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
