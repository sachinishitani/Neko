var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('other-management', {
    title: 'あざ-マネジメント' ,
    content: 'マネージャー？でてます'});
  });
console.log("ここ通ってるよ");


router.post('/post',(req, res, next) => {
  var name = req.body.name;
  var data = {
      title: 'Hello!',
      name: "name"
  };
  res.render('hello', data);
});


module.exports = router;
