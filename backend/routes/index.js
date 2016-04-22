var models  = require('../models');
var express = require('express');
var router  = express.Router();
var passport = require('passport')

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

//Facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));
router.get('/auth/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/api/auth/success',
                                    failureRedirect: '/api/auth/failure' }));

router.get('/auth/success', function(req, res) {
    console.log("AUTHENTICATION SCCESS")
    res.send({message: "success"});
});
router.get('/auth/failure', function(req, res) {
    console.log("ERROR IN AUTHENTICATING")
    res.send({message:"failure"});
});

router.get('/events/:id', EventCtrl.findOne);
router.get('/attendances/:id', AttendanceCtrl.findOne);
router.get('/categories/:id', CategoryCtrl.findOne);

router.get('/users/eventAttendees/:id', UserCtrl.findAttendeesByEvent);

router.post('/events', EventCtrl.create);
router.post('/attendances', AttendanceCtrl.create);
router.post('/categories', CategoryCtrl.create);
router.post('/users', UserCtrl.create);
router.post('/sessions', SessionCtrl.create)
router.post('/contacts', ContactCtrl.create)


router.post('/events/:id', EventCtrl.update);
router.post('/categories/:id', CategoryCtrl.update);
router.post('/users/:id', UserCtrl.update);


router.delete('/events/:id', EventCtrl.delete);
router.delete('/attendances/:eventId', AttendanceCtrl.delete);
router.delete('/categories/:id', CategoryCtrl.delete);

module.exports = router;
