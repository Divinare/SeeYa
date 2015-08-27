var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize')
var Attendance = models.Attendance

module.exports = {
	findOne: function (req, res) {
		var attendanceId = req.params.id;
		Attendance.findOne({
			where: { id: attendanceId }
		}).then(function (attendance) {
			res.send(attendance);
		});
	},

	findAll: function (req, res) {
		Attendance.findAll({
			include: [ models.Event ]
		}).then(function (attendances) {
        /*
          if (error) {
            res.status(500).send(error);
            return;
          }
          */
          res.send(attendances);
      });
	},

	create: function (req, res) {
		var attendanceToAdd = req.body;
		console.log(attendanceToAdd.event)
		console.log(attendanceToAdd)

		Attendance.create({
			name: attendanceToAdd.name,
			email: attendanceToAdd.email,
			comment: attendanceToAdd.comment
		}).then(function(attendance) {
			attendance.setEvent(attendanceToAdd.event.id)
			console.log('Attendance created successfully');
          	res.send(attendance);
		});
},

 /*	update: function (req, res) {
 		var registrationId = req.params.id;
 		Registration.findOne({
 			where: { id: registrationId}
 		}).then(function( registration) {
 			registration.comment = req.body['comment'];
 			registration.save(function(err) {
 				if (err) {
 					return res.send(err);
 				}
 				res.send(200);
 			});
 		});
}*/

};
