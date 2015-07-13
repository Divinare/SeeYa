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
app.use(express["static"](dist));
/*
console.log(dist + '/index.html');
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', function(req, res) {
    res.sendFile(dist + '/index.html');
});
*/
//var port = process.env.PORT || 1337;

//var router = express.Router(); 
var rest = '/api';
app.use(rest, routes);




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