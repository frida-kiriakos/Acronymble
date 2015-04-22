var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/acronymble');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  points: Number,
  rounds_played: Number,
  rank: String
});

var UserModel = mongoose.model("UserSchema", UserSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// source: http://stackoverflow.com/questions/16123346/generate-random-letters-in-javascript-and-count-how-many-times-each-letter-has-o
function generateLetter(numLetter){
  var index, temp;
  var array = [];
  for(index=0; index < numLetter; index++){
    temp = String.fromCharCode(97 + Math.floor(Math.random()*26));
    array.push(temp);
  }
  return array;
};

// for testing purpose
app.get('/:num', function(req,res){
  var numLetter;
  var array =[];
  numLetter = req.params.num;
  array = generateLetter(numLetter);
  res.json(array);
  console.log(array);
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
