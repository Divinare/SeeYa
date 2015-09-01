var models  = require('../models');
var express = require('express');
var router  = express.Router();

var EventCtrl = require('../controllers/EventController.js');
var AddressCtrl = require('../controllers/AddressController.js');
var AttendanceCtrl = require('../controllers/AttendanceController.js');

/*
router.post('/create', function(req, res) {
  models.User.create({
    username: req.param('username')
  }).then(function() {
    res.redirect('/');
  });
});
*/
/*
router.get('/', function(req, res) {

});
*/

router.get('/events', EventCtrl.findAll);
router.get('/events/:id', EventCtrl.findOne);
router.post('/events', EventCtrl.create);
router.post('/events/:id', EventCtrl.update);
router.delete('/events/:id', EventCtrl.delete);

router.get('/attendances', AttendanceCtrl.findAll);
router.get('/attendances/:id', AttendanceCtrl.findOne);
router.post('/attendances', AttendanceCtrl.create);
router.delete('/attendances/:id', AttendanceCtrl.delete)



/*
router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.param('user_id')
    }
  }).then(function() {
    res.redirect('/');
  });
});

router.post('/:user_id/tasks/create', function (req, res) {
  models.Task.create({
    title: req.param('title'),
    UserId: req.param('user_id')
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.param('task_id')
    }
  }).then(function() {
    res.redirect('/');
  });
});
*/

module.exports = router;
