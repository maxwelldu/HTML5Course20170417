var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var categoryRouter = require('./app/routes/category');
var setupRouter = require('./app/routes/setup');
var userRouter = require('./app/routes/user');
var blogRouter = require('./app/routes/blog');
var commentRouter = require('./app/routes/comment');

var app = express();
var port = process.env.PORT || 8080;
var config = require('./config');
mongoose.connect(config.database);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/category', categoryRouter);
app.use('/setup', setupRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);

app.listen(port);
console.log('Magic happends at http://localhost:' + port);
