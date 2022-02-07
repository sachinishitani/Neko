var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../models/user');

//このページに来た時
router.get('/loguot',(req, res, next) => {
console.log("ヘッダー");
});

module.exports = router;