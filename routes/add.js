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
    console.log('シークエライズ');
    console.log(Nekosan);
  });
  res.render('add',{title:'新規登録'}
  )
});

//router.get('/post', (req, res, next) => {
//  console.log("来てないですよね");
//    var data = {
//      title: 'Add',
//      content: '新しいレコードを入力',
//      form: req.body
//    }
//    res.render('add', data);
//  });

  //登録処理
  router.post('/post', (req, res, next) => {
    console.log("ねこねこ");
    db.sequelize.sync()
    .then(() => db.Nekosan.create({
      name: req.body.name,
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