var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var models = require("./models");
var debug = require("debug")("EventMeetup");
var util = require('util');
var jade = require('jade');

var routes = require('./routes');

console.log("ENV::::::::::::::: " + process.env.NODE_ENV);
console.log(process.env.PORT);
var dist = path.join(__dirname, '/../dist');
var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(dist));

var rest = '/api';
app.use(rest, routes);

app.get('*', function (req, res) {
  res.render('index');
  //var options = {};
 // var html = jade.render(path.join(__dirname, 'views'), options);
  //res.render(path.join(__dirname, 'views'));

});

app.use(function(req, res, next) { 
  var err;
  err = new Error("Not Found");
  err.status = 404;
  return next(err);
  
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.send({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  });
}

if (app.get("env") === "production") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.send({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.send({
    message: err.message
  });
});

app.set('port', process.env.PORT || 1337);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});