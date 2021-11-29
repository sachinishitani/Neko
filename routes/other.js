var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'neko'
};

/* GET home page. */
//router.get('/', (req, res, next) => {
//  res.render('other', { title: 'あざ' ,
//    content: '内容でてます～？でてますね＝＝＝'});
//  });

router.get('/', (req, res, next) => {

  //コネクションの用意
  var connection = mysql.createConnection(mysql_setting);

  //データベースに接続
  connection.connect();

  //データを取り出す
  connection.query('SELECT * from nekos',
    function (error, results, fields) {
      //データベースアクセス完了時の処理
      if (error == null) {
        var data = {
          title: 'Index',
          content: results
        };
        res.render('other', data);
      }
    });
  //接続を解除
  connection.end();
});

/////////////////////////////////////


router.post('/:id/delete', (req, res, next) => {

  console.log("きてくれたのか～");

  var id = req.params.id;
  //コネクションの用意
  var connection = mysql.createConnection(mysql_setting);

  //データベースに接続
  connection.connect();


  console.log(req.params.id);
  //データを削除する
  connection.query('DELETE FROM nekos WHERE id = ?', id, function (error, results, fields) {
    if (error == null) {
      console.log("おっぺけぺ：", error);
    }
    res.redirect('/other');
  
  });

  //接続を解除
  connection.end();
});

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
  //router.post('/:id/update', (req, res, next) => {

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
