var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fileupload = require('express-fileupload');
var session = require('express-session');
var cors = require('cors');

// var authenticateToken = require('./routes/middleware');
var indexRouter = require('./routes/index');
var topicsRouter = require('./routes/topic');
var usersRouter = require('./routes/user');
var newsRouter = require('./routes/news');
var answersRouter = require('./routes/answer');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileupload());
app.use(session({
  secret: '123456',
  resave: true,
  saveUninitialized: true
}));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(authenticateToken);
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/topic', topicsRouter);
app.use('/news', newsRouter);
app.use('/answer', answersRouter);

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

module.exports = app;
