var express = require("express");

//var http = require('http');
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var models = require("./models");

var debug = require("debug")("EventMeetup");

//require("babel/register");

//require('./routes');
var util = require('util');
var routes = require('./routes/index');
//var users  = require('./routes/users');

var dist = path.join(__dirname, '/../dist');

var app = express();

//var models = require('./models');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public'))); // dist?
//app.use(express.static(path.join(__dirname, 'public'))); // dist?
//app.use(express["static"](dist));

var rest = '/api';
app.use(rest, routes);


//var port = process.env.PORT || 1337;

//var router = express.Router(); 




//app.use('/users', users);

//app.use('/', routes);
//app.use('/users', users);


//app.use(router);
/*
app.use(bodyParser.urlencoded({
  extended: false
}));
*/



/*
router.get('/api/events', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
*/

//app.use("/api", require('./controllers/EventController.js'));



//app.use('/', router);


//app.set("port", process.env.PORT || 1337);

var paths = ['/about', '/eventForm']; 

app.use(express["static"](dist));
//app.use(express.static(path.join(__dirname, 'dist'))); // dist?
/*
app.get('/about', function(req, res) {
console.log(util.inspect(req));

  res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
});

app.get('/eventForm', function(req, res) {
  res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
});
*/


app.get('*', function(req, res) {
    //res.sendFile(dist + '/index.html');
   // var fileName = dist + '/index.html';
   var currentPath = req._parsedUrl.pathname;
   var pathFound = false;
   paths.map(function(existingPath) {
        if(existingPath == currentPath) {
            console.log("AAAAAAAAAAAAAAAAAAA");
              res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
              pathFound = true;
        }
   });
   if(!pathFound) {
       res.sendFile(path.join(__dirname, 'notFound.html'));
   }
 //  res.sendFile(path.join(__dirname, '/../dist', 'index.html'));
   /*
    var fileName = __dirname + '/../frontend/index.html';
    res.set('content-type', 'text/html');
    res.sendFile(fileName, function (err) {
        if (err) {
          console.log(err);
          res.status(err.status).end();
        }
        else {
          console.log('Sent:', fileName);
        }
    });

*/

});

/*
app.get('/', function(req, res) {
    //res.sendFile(dist + '/index.html');
   // var fileName = dist + '/index.html';
   res.redirect('/error');
   res.sendFile(path.join(__dirname, '/../dist', 'index.html'));


});
*/

app.use(function(req, res, next) {
 // res.redirect('/error');
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







//var server = http.createServer(app);

/*
models.sequelize.sync().then(function () {
    server.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});
*/

/*
server.listen(app.get("port"), function() {
  return debug("Express server listening on port " + server.address().port);
});

*/
//app.listen(port);