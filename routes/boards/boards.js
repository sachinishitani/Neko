var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Nekosan = require('../../models/nekosan');
const db = require('../../models/index');
const Sequelize = require('sequelize');
const {Op} = require("sequelize");
const pnum = 10;

//ログインのチェック
//function check(req, res) {
//  if (req.session.login == null) {
//    req.session.back = '/boards';
//    res.redirect('/users/login')
//    return true;
//  } else {
//    return false;
//  }
//}


//このページに来た時
//router.get('/', (req, res, next) => {
//  console.log("ボードきてます",req.session.login)
  // ログインしていない＝req.session.loginは存在しない
//  if (!req.session.login) {
//      var data = {
//        title: "board", //タイトル
//        username:"未ログイン", // ヘッダーで表示させる名前
//      }
//      res.redirect('index');
  // ログイン済（req.session.loginが存在する）の場合はユーザーネームを表示させる
//  } else  {
//      var data = {
//        title: "ボード",
//        username:req.session.login.username,
//      }
//      res.render('board', data );
//  }


router.get('/', (req, res, next)=> {
  console.log("ここっこここ");
  res.redirect('/boards/0');
});

//ＴＯＰ画面にページ番号を付けてアクセス
router.get('/:page', (req, res, next)=> {
  if (check(req, res)){ return };
  const pg = req.params.page * 1;

  db.Board.findAll({
    offset: pg * pnum,
    limit: pnum,
    order: [
      ['createdAt', 'DESC']
    ],
    include: [{
      model: db.User,
      required: true
    }]
  }).then(brds => {
    var data = {
      title: 'Boards',
      login:req.session.login,
      content: brds,
      page:pg
    }
    res.render('boards/index', data);
  });
});

//Messageを送信したとき
router.post('/post', (req, res, next) => {
  if (check(req, res)){ return };
  db.sequelize.sync()
  .then(()=> db.Board.create({
    useId: req.session.login.id,
    message:req.body.msg
  })
  .then(brd=> {
    res.redirect('/boards');
  })
  .catch((err)=>{
    res.redirect('/boards');
  })
  )
});

//Userのホーム
router.get('/home/:user/:id/:page',(req, res, next)=> {
  if (check(req, res)){ return };
  const id = req.params.id * 1;
  const pg = req.params.page * 1;
  db.Board.findAll({
    where: {userId: id},
    offset: pg * pnum,
    limit: pnum,
    order: [
      ['createdAt','DESC']
    ],
    include: [{
      model: db.User,
      required: true
    }]
  }).then(brds => {
    var data = {
      title:'Boards',
      login: req.session.login,
      userId:id,
      userName: req.params.user,
      content: brds,
      page:pg
    }
    res.render('/boards/home', data);
  });
});

module.exports = router;
