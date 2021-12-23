var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Signup = require('../models/signup');

/* GET home page. */
router.get('/', (req, res, next) => {
 console.log("こっち");
  db.Signup.findAll().then(Signup => {
    console.log(Signup);
  });
  res.render('signup',{title:'新規登録'}
  )
});

//////////////////////////////////////////////
  //新規登録処理
  router.post('/post', (req, res, next) => {
    console.log('にゃんぱすー');
    db.sequelize.sync()
      .then(() => db.Signup.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }))
    .then(Signup => {
      res.redirect('/other')
   });
});
/////////////////////////////////////////////


module.exports = router;