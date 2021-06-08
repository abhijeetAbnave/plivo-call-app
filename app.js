var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
 res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
