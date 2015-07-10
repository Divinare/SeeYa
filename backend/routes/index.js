var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/api/events', function(req, res) {
	console.log("test");
  models.Event.findAll()
  .then(function(events) {
  	console.log("test");
    res.send(events);
  });
});

module.exports = router;