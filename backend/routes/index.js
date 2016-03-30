var models  = require('../models');
var express = require('express');
var router  = express.Router();

var EventCtrl = require('../controllers/EventController.js');
var AddressCtrl = require('../controllers/AddressController.js');
var AttendanceCtrl = require('../controllers/AttendanceController.js');
var CategoryCtrl = require('../controllers/CategoryController.js');
var UserCtrl = require('../controllers/UserController.js');
var SessionCtrl = require('../controllers/SessionController.js');

router.get('/events', EventCtrl.findAll);
router.get('/filteredEvents/:category/:fromTimestamp/:toTimestamp', EventCtrl.filterEvents);
router.get('/attendances', AttendanceCtrl.findAll);
router.get('/categories', CategoryCtrl.findAll);

router.get('/isloggedin', SessionCtrl.isLoggedIn);
router.get('/logout', SessionCtrl.logout);

router.get('/events/:id', EventCtrl.findOne);
router.get('/attendances/:id', AttendanceCtrl.findOne);
router.get('/categories/:id', CategoryCtrl.findOne);

router.post('/events', EventCtrl.create);
router.post('/attendances', AttendanceCtrl.create);
router.post('/categories', CategoryCtrl.create);
router.post('/users', UserCtrl.create);
router.post('/sessions', SessionCtrl.create)

router.post('/events/:id', EventCtrl.update);
router.post('/categories/:id', CategoryCtrl.update);

router.delete('/events/:id', EventCtrl.delete);
router.delete('/attendances/:id', AttendanceCtrl.delete);
router.delete('/categories/:id', CategoryCtrl.delete);

module.exports = router;
