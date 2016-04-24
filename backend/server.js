var express = require("express");
var path = require("path");
var logger = require("morgan");
var models = require("./models");
var debug = require("debug")("EventMeetup");
var util = require('util');
var jade = require('jade');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("client-sessions");
var routes = require('./routes');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var authConfig = require('../config/auth.js')
var sessionController = require('./controllers/SessionController.js')


// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `done`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: authConfig.facebookAuth.clientID,
    clientSecret: authConfig.facebookAuth.clientSecret,
    callbackURL: authConfig.facebookAuth.callbackURL,
    profileFields: ['id', 'displayName', 'link', 'emails'],
    passReqToCallback: true,
    enableProof: true
  }, 
 function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      sessionController.loginOAuth(req, accessToken, refreshToken, profile, done)
    })    
  }));



console.log("ENV::::::::::::::: " + process.env.NODE_ENV);
console.log(process.env.PORT);
var dist = path.join(__dirname, '/../dist');
var app = express();

//encrypted cookie, the user info should be fetched from db according to information in this cookie
app.use(session({
  cookieName: 'seeyaSession',
  secret: 'fustUwecRabuZaFremuqes8uxUnuMU',
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 5 * 60 * 1000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  ephemeral: true //lose the session when browser closes
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {  
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {  
   /* User.findOne({ _id: id }, function (err, user) {
        done(err, user);
    });*/
  done(null, null);
});

var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(dist));

var rest = '/api';

app.get('/authError', sessionController.oAuthError);

app.use(rest, routes);


app.get('*', function (req, res) {
  res.render('index');
});

/*

COMMENTED THESE OUT JUST TO CHECK IF IT IS USELESS OR NOT T.Joe
So far nothing critical has happened so maybe its useless :P

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
*/

app.set('port', process.env.PORT || 1337);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});