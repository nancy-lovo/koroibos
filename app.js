var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var olympiansRouter = require('./routes/api/v1/olympians');
var eventsRouter = require('./routes/api/v1/events');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1', olympiansRouter);
app.use('/api/v1/events', eventsRouter);
app.use((req, res, next)=>{
  res.status(404).send({message:"Not Found"});
});

module.exports = app;
