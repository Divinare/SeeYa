var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize');
var Attendance = models.Attendance;
var helper = require("../helpers/helper.js");
var userService = require('../services/UserService.js');

module.exports = {
	findOne: function (req, res) {
		var attendanceId = req.params.id;
		Attendance.findOne({
			where: { id: attendanceId }
		}).then(function (attendance) {
			res.send(attendance);
		}).catch(function(err){
            helper.sendErr(res, 400, err);
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

	//TODO: when we have users check that the user is not already attending the event
	create: function (req, res) {
		var attendanceToAdd = req.body;
		console.log(attendanceToAdd.event)
		console.log(attendanceToAdd)

        var success = function(user){
            Attendance.upsert({ //insert or update
                comment: attendanceToAdd.comment,
                EventId: attendanceToAdd.event.id,
                userId: user.id
            }).then(function(attendance){
                res.send(attendance)
            }).catch(function(err){
                helper.sendErr(res, 400, err);
            });
        }
        var error = function(err){
            helper.sendErr(res, 400, err);
        }
        userService.getLoggedInUser(req, res, success, error);
	},

    //TODO: add check that the user is signed in and the creator of the event
    delete: function(req, res){
        var success = function(user){
            var attendanceId = req.params.id;
            Attendance.findOne({
                where: { id: attendanceId }
            }).then(function (attendance) {
                if( user.id === attendance.userId ){
                    models.Attendance.destroy({
                        where: {
                            id: attendanceId
                        }
                    }).then(function(){
                        res.status(200).send();
                    }).catch(function(err){
                        helper.sendErr(res, 400, err);
                    });
                }else{
                    helper.sendErr(res, 400, err);  //not authorized
                }
            }).catch(function(err){
                helper.sendErr(res, 400, err); 
            });
        }
        userService.getLoggedInUser(req, res, success, error);
    }

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
