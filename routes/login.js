var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const passport = require('passport');
const User = require('../models/user');


/* GET home page. */
router.get('/', (req, res, next) => {
  const nm = req.body.username;
  const ml = req.body.mail;

 console.log("こっち");
  db.User.findAll({
    where: {
      [Op.or]:[
        {name:{[Op.like]:'%'+nm+'%'}},
        {mail:{[Op.like]:'%'+ml+'%'}}
      ]
    }
  }).then(User => {
    console.log(User);
  });
  res.render('login',{title:'ろぐいん'}
  )
});
////////////////////////////////////////////

//const id = req.params.id;
//const password = req.query['password'];

// ここまで=======================================================
//SQL文
//SELECT COUNT(*) FROM signups WHERE id=1 and password='117117';
//////////////////////////////////////////////
  //ログイン処理
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

//const { count, rows } = await db.Signup.findAndCountAll({
//  where: {
//    email: req.body.email
//  },
//  offset: 0,
//  limit: 1
//});
//if(count == 0){
  // 行がない場合のみアカウント登録処理
//} else {
  // アカウントが重複している旨エラーを返す
//}


  module.exports = router;