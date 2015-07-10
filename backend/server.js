var app, bodyParser, cookieParser, debug, dist, express, http, logger, path, server;

express = require("express");

http = require('http');

path = require("path");

logger = require("morgan");

cookieParser = require("cookie-parser");

bodyParser = require("body-parser");

debug = require("debug")("react-express-template");

require("babel/register");

dist = path.join(__dirname, '/../dist');

app = express();

var rest = require('epilogue');
var models = require('./models');

app.use(logger("dev"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(express["static"](dist));

app.set("port", process.env.PORT || 1337);


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

server = http.createServer(app);

server.listen(app.get("port"), function() {
  return debug("Express server listening on port " + server.address().port);
});