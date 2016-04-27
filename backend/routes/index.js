var models  = require('../models');
var express = require('express');
var router  = express.Router();
var passport = require('passport')

var Security = require('../helpers/security.js');
var EventCtrl = require('../controllers/EventController.js');
var AddressCtrl = require('../controllers/AddressController.js');
var AttendanceCtrl = require('../controllers/AttendanceController.js');
var CategoryCtrl = require('../controllers/CategoryController.js');
var UserCtrl = require('../controllers/UserController.js');
var SessionCtrl = require('../controllers/SessionController.js');
var ContactCtrl = require('../controllers/ContactController.js');

router.get('/events', EventCtrl.findAll);
router.get('/filteredEvents/:category/:fromTimestamp/:toTimestamp', EventCtrl.filterEvents);
router.get('/attendances', AttendanceCtrl.findAll);
router.get('/categories', CategoryCtrl.findAll);

router.get('/isloggedin', SessionCtrl.isLoggedIn);
router.get('/logout', SessionCtrl.logout);

router.get('/events/:id', EventCtrl.findOne);
router.get('/attendances/:id', AttendanceCtrl.findOne);
router.get('/categories/:id', CategoryCtrl.findOne);

router.get('/users/eventAttendees/:id', UserCtrl.findAttendeesByEvent);

router.post('/events', Security.sanitizeInput, EventCtrl.create);
router.post('/attendances', Security.sanitizeInput, AttendanceCtrl.create);
router.post('/categories', Security.sanitizeInput, CategoryCtrl.create);
router.post('/users', Security.sanitizeInput, UserCtrl.create);
router.post('/sessions', Security.sanitizeInput, SessionCtrl.create)
router.post('/contacts', Security.sanitizeInput, ContactCtrl.create)


router.post('/events/:id', Security.sanitizeInput, EventCtrl.update);
router.post('/categories/:id', Security.sanitizeInput, CategoryCtrl.update);
router.post('/users/:id', Security.sanitizeInput, UserCtrl.update);


router.delete('/events/:id', EventCtrl.delete);
router.delete('/attendances/:eventId', AttendanceCtrl.delete);
router.delete('/categories/:id', CategoryCtrl.delete);





/**
SOCIAL AUTHENTICATION (FB, GOOGLE, etc.)
**/

//Facebook
//we don't want to use the passport sessions, instead we use our own client sessions,
//that's why session: false
//Instructions at http://jeroenpelgrims.com/token-based-sessionless-auth-using-express-and-passport/ 
//were used and modified for our needs
router.get('/auth/facebook', passport.authenticate('facebook', { session: false, scope: 'email'}));
router.get('/auth/facebook/callback',
passport.authenticate('facebook', { session: false, /*failureRedirect: '/authError' */}),
    //success
    function(req, res){
        console.log(req.authErrorMessage)
        if( req.authError == null){
            SessionCtrl.oAuthSuccess(req, res);
        }else{
            SessionCtrl.oAuthError(req, res);
        }

    }
    /*,
    //error
    function(req, res   ){
        SessionCtrl.oAuthError(req, res);
    }*/
);




module.exports = router;
