var app;
var bodyParser;
var cookieParser;
var debug;
var dist;
var express;
var http;
var logger;
var path;
var server;

var express = require("express");

var http = require('http');

var path = require("path");

var logger = require("morgan");

var cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

var debug = require("debug")("react-express-template");

require("babel/register");

require('./routes');

var dist = path.join(__dirname, '/../dist');

var app = express();

//var rest = require('epilogue');
var models = require('./models');

app.use(logger("dev"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(express["static"](dist));

app.set("port", process.env.PORT || 1337);

/*
rest.initialize({
    app: app,
    base: '/rest',
    sequelize: models.sequelize
});


var events = rest.resource({
    model: models.Event,
    include: [models.Address],
    endpoints: ['/events', '/events/:id']
});

var address = rest.resource({
    model: models.Address,
    include: [models.Event],
    endpoints: ['/address', '/address/:id']
}); */



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

server = http.createServer(app);

models.sequelize.sync().then(function () {
    server.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});

/*
server.listen(app.get("port"), function() {
  return debug("Express server listening on port " + server.address().port);
});*/