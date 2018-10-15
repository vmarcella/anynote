//Requiring all packages and creating our mongoose connection
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/anynote', {useNewUrlParser: true})

//Requiring all of our routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sectionsRouter = require('./routes/sections');
const notesRouter = require('./routes/notes');

//Create the express server
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Attach middleware to express server
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Attach routers to express server
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sections',sectionsRouter);
app.use('/notes', notesRouter);

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

//Export our server
module.exports = app;
