var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Nekosan = require('../models/nekosans');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//このページにきたとき
router.get('/', (req, res, next) => {

  console.log("あどはこっち");
  //ログインしていない＝req.session.loginは存在しない
  if(!req.session.login) {
    db.Nekosan.findAll().then(Nekosan => {
      var data = {
        title: "add", //タイトル
        username:"未ログイン", // ヘッダーで表示させる名前
        content: Nekosan //登録されている全猫ちゃん
      }
      res.render('add', data);
    })
    //ログイン済（req.session.loginが存在する）場合はユーザーネームを表示する
    } else {
      db.Nekosan.findAll().then(Nekosan => {

        var data = {
          title: "add",
          username:req.session.login.username,
          content: Nekosan
        }
        res.render('add', data );
      })
    }
});

//登録処理
router.post('/post', (req, res, next) => {

  console.log("ねこねこ");
  db.sequelize.sync()
    .then(() => db.Nekosan.create({
      name: req.body.name,
      user_id: req.body.user_id,
      age: req.body.age,
      food: req.body.food,
      personality: req.body.personality,
      favoriteToys: req.body.favoriteToys,
      favoriteSnack: req.body.favoriteSnack
    }))
    .then(Nekosan => {
      res.redirect('/other')
    });
});

module.exports = router;