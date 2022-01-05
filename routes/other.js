var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Nekosan = require('../models/nekosan');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//var mysql_setting = {
//  host: 'localhost',
//  user: 'root',
//  password: '',
//  database: 'neko'
//};

//router.get('/', (req, res, next) => {
//  res.render('other', { title: 'あざ' ,
//    content: '内容でてます～？でてますね＝＝＝'});
//  });

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
      res.render('other', data );
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

//  var id = req.params.id;
 // console.log(req.params.id);
  //データを削除する
 // connection.query('DELETE FROM nekos WHERE id = ?', id, function (error, results, fields) {
 //   if (error == null) {
 //     console.log("おっぺけぺ：", error);
 //   }
 //   res.redirect('/other');
//  });
//});

	//try{
	//	const seller_category = await Category.update( { deleteFlg: flgOn }, { where: { id: req.params.id } });
	//	console.log( "まずはここ来た！" );
	//	if (seller_category == 0) {
	//		console.log("更新データはありません");
	//		res.redirect('/admins/management/seller-category/');
	//	}else{
	//		console.log("更新したよん");
	//		res.redirect('/admins/management/seller-category/');
	//	}
	//}catch(err){
	//	console.log( err ,"エラー発生です");

  //  console.log("きてくれたのか～2");
  //  var id = req.body.id;
  //  var data = {
  //    'id': req.body.id,
  //    'name': req.body.name,
  //    'age': req.body.age,
 //     'food': req.body.food,
  //    'personality': req.body.personality
  //  };
  //
    //コネクションの用意
  //  var connection = mysql.createConnection(mysql_setting);
    //データベースに接続
 //   connection.connect();
  //  console.log(req.body.id);
    //データを更新する
  //  connection.query('UPDATE nekos set ? WHERE id = ?', [data, id], function (error, results, fields) {
 //     if (error == null) {
 //       console.log("おっぺけぺ：", error);
 //     }
 //     res.redirect('/other');
 //   });
    //接続を解除
   /// connection.end();
//  });

module.exports = router;
