'use strict'

var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();
const passport = require('passport');
///////////////////////////////////

var session = require('express-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hello = require('./routes/hello');
var other = require('./routes/other');
//var auth = require('./routes/auth');
//var loginTrue = require('./routes/login-true');
var add = require('./routes/add');
var edit = require('./routes/edit');
var deleted = require('./routes/deleted');
var index = require('./routes/index');
var otherManagement = require('./routes/other-management');
var mysql = require('mysql');
var login = require('./routes/login');
var signup = require('./routes/signup');
/////////////////////////////////////////////
const authMiddleware = (req, res, next) => {
  if(req.isAuthenticated()) { // ログインしてるかチェック

    next();

  } else {

    res.redirect(302, '/login');

  }
};


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'neko'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

connection.query(
 'SELECT * FROM nekos',
  (error, results) => {
    console.log(results);
       //res.render('hello2.ejs');
  }
);
////////////////////////////////////

//app.use(session({
//  secret: 'secret',
//  resave: false,
// saveUninitialized: false,
//  cookie:{
//httpOnly: true,
// secure: false,
//  maxage: 1000 * 60 * 30
//  }
//}); 
//
/////////////////////////////////////////////////////////////////////
//var session_opt = {
 // secret: 'keyboard cat',
  //resave: false,
  //saveUninitialized: false,
  //cookie: { maxAge: 60 * 60 * 1000 }
//};
//app.use(session(session_opt));
//////20211203/////ここから///
//app.use(session({
 // secret: 'YOUR-SECRET-STRING',
//  resave: true,
//  saveUninitialized: true
//}));


app.use(express.static(path.join(__dirname, 'public')));

// 追加
app.use(session({
secret: "secret word",
resave: false,
saveUninitialized: false,
cookie: {
  maxAge: 60 * 1000
}
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', hello);
app.use('/other', other);
app.use('/index', index);

app.use('/other-management',otherManagement);
app.use('/add', add);
app.use('/edit', edit);
app.use('/deleted', deleted);
app.use('/login', login);
app.use('/signup', signup);
//app.use('/login-true', loginTrue);
app.use(passport.initialize());
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.session());
///////20211217/////
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
}, function (req, username, password, done) {
  process.nextTick(function () {
    if (username === "test" && password === "test") {
      return done(null, username)
    } else {
      console.log("login error")
      return done(null, false, { message: 'パスワードが正しくありません。' })
    }
  })
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// localhostでhttps接続の設定
const https = require('https');
const fs = require('fs');
const ejs = require('ejs');

const port = 3000;
const httpsOptions = {
  key:  fs.readFileSync('./security/cert.key'),
  cert: fs.readFileSync('./security/cert.pem')
};

const server = https.createServer(httpsOptions, app)
  .listen(port, () => {
  console.log('server running at ' + port);
});
// localhostでhttps接続の設定 ここまで

///////////////////////////////////////


module.exports = app;
