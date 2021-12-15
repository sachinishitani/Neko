var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
  title: 'インデックス' ,
  content: '眠いむい'});
});
console.log("ねこさん！！！！");

module.exports = router;
