'use strict'

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hello = require('./routes/hello');
var other = require('./routes/other');
var add = require('./routes/add');
var edit = require('./routes/edit');
var deleted = require('./routes/deleted');
var index = require('./routes/index');
var otherManagement = require('./routes/other-management');
var mysql = require('mysql');
var login = require('./routes/login');
const session = require('express-session');//★

/////////////////////////////////////////////////////

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




/////////////////////////////////////////////////////////////////////
var session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};
app.use(session(session_opt));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
const router = require('./routes/index');
// const url = require('url');

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


module.exports = app;
