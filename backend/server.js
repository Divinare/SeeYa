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

app.get('/favicon.ico', function(req, res) {
  console.log("WTF");
  res.send('');
});


var paths = ['/about', '/eventForm', '/test', '/', '/events/1', '/events/main.css', '/events/main.js']; 

app.use(express["static"](dist));
//app.use(express.static(__dirname + '/dist'));
/*
app.get('/about/about/', function(req, res) {
  console.log("LOL");
  res.sendFile(path.join(__dirname, '/../dist', 'index.html'));

});
*/
console.log(__dirname + '/../dist/index.html');
/*
app.get('/events/:id', function(req, res) {
  console.log("LOL???");
  res.sendFile(path.join(__dirname, '/../dist', 'index.html'));


});
*/
/*

app.get('*', function(req, res) {
  console.log("app.get method");
   var currentPath = req._parsedUrl.pathname;
   var pathFound = false;
   paths.map(function(existingPath) {
        if(existingPath == currentPath) {
              console.log("path exists");
              pathFound = true;
        }
   });
   var eventUrlRegex = /^\/event\/\d+(\/$|$)/
   console.log("currentPath: " + currentPath)
   if(currentPath.search(eventUrlRegex) !== -1){
      console.log("found event url");
      pathFound = true;
   }
   if(pathFound) {
    console.log("path found!!");
    res.send({message: 'Hello'});
   // res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
    //res.render(__dirname + '/../dist/index.html');
       
   }else{
    console.log("path not found, returning error page");
    res.sendFile(path.join(__dirname, 'notFound.html'));
   }

});
*/


app.use(function(req, res, next) {
  console.log("NOOOOOOOOOOT FOUND");
 // res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
  
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