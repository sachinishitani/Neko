var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  console.log("きてるん？？",req.session.login);
  let username;
  if (!req.session.login){
    username = '未ログイン';
  } else {
    username = req.session.login.username;
  };
  res.render('index',{username:username}
  );
});

module.exports = router;
