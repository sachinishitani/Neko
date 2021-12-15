var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Nekosan = require('../models/nekosan');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log("こっち");
  db.Nekosan.findAll().then(Nekosan => {
    console.log('（Ｕ＾ω＾）わんわんお！');
  });
  res.render('login',{title:'ろぐいん'}
  )
});

//新規作成ページへのアクセス
router.get('/post', (req, res, next) => {
    var data = {
      title: 'login',
      content: '新しいレコードを入力',
      form: req.body
    }

    res.render('login', data);
  });

  //新規作成フォーム送信の処理
  router.post('/post', (req, res, next) => {
    console.log('にゃんぱすー');
    db.sequelize.sync()
    .then(() => db.Nekosan.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }))
    .then(Nekosan => {
      res.redirect('/login')
    });
  });


  module.exports = router;