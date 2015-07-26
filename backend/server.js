var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var models = require("./models");
var debug = require("debug")("EventMeetup");
var util = require('util');

var routes = require('./routes');
var dist = path.join(__dirname, '/../dist');
var app = express();
var router = express.Router();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('views', dist);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.set('view engine', 'jade');
/*
app.set('views', __dirname + '/components');
app.engine('jsx', ReactEngine());
app.engine('jsx', ReactEngine({wrapper: 'html.jsx'}));
*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(dist));
//app.use(express.static(path.join(__dirname, 'public')));

console.log("aaaaaaaaaa");
console.log(dist);
console.log(path.join(__dirname + '/views'));
//var rest = '/api';
//app.use(rest, routes);
/*
app.get('/favicon.ico', function(req, res) {
  res.send('');
});
*/


//app.use(express["static"](dist));
//app.use(express.static(path.join(dist, 'public')));

app.get('*', function (req, res) {
  console.log("???");
  res.render('index');
  //res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
 // res.render('index.jsx');

});

/*
app.get('*', function(req, res) {
  console.log("send index!");
  res.render('index.jsx');
 // res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
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
 //  res.send({message: 'Hello'});
    res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
    //res.render(__dirname + '/../dist/index.html');
       
   }else{
    console.log("path not found, returning error page");
    res.sendFile(path.join(__dirname, 'notFound.html'));
   }

});
*/


app.use(function(req, res, next) {
 // res.sendFile(path.join(__dirname, '/../dist', 'main.js'));
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







/*

<!DOCTYPE html>
<html>
<head>
  <title>EventMeetup</title>
  <link rel="stylesheet" type="text/css" href="main.css">
</head>
<body>
  <h1>mooo</h1>
  <div id="container"></div>


 <script src="main.js"></script>
</body>
</html>

*/