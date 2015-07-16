var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var models = require("./models");
var debug = require("debug")("EventMeetup");
var util = require('util');

var routes = require('./routes/index');
var dist = path.join(__dirname, '/../dist');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


var rest = '/api';
app.use(rest, routes);

var paths = ['/about', '/eventForm']; 

app.use(express["static"](dist));

app.get('*', function(req, res) {

   var currentPath = req._parsedUrl.pathname;
   var pathFound = false;
   paths.map(function(existingPath) {
        if(existingPath == currentPath) {
              res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
              pathFound = true;
        }
   });
   if(!pathFound) {
       res.sendFile(path.join(__dirname, 'notFound.html'));
   }

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