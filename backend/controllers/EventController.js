var router = require("express").Router();
//var Event = require('../models/event.js');
var models  = require('../models');


module.exports = {
/*
 	findOne: function (req, res) {
 		var eventId = req.params.id;
 		Event.findOne({
 			where: { id: eventId }
 		}).populate('address')
 		.then(function (event) {
 			console.log(event);
 			res.send(event);
 		});
 	},
*/
/*
  findAll: function (req, res) {
 		models.Event.findAll().then(function (events) {
 			res.json(events);
 		});

 	}
*/

    findAll: function (req, res) {
        console.log("moiii")
        models.Event.findAll().then(function (events) {
            res.json(events);
        });
  }
 	
/*
 	function findAll (req, res) {
 		console.log("BBBBBBBBBBBBBbbs")
    console.log(Event.find);
  Event.findAll(function (error, events) {
    if (error) {
      log.error(error, "error finding customers");
      res.status(500).send(error);
      return;
    }
    res.json(events);
  });
}
*/


 /*
 	create: function (req, res) {
 		var eventToAdd = req.body;
 		console.log(eventToAdd.address)
 	var address
 	Address.create({
 		streetAddress: eventToAdd.address.streetAddress
 	}).then(function(address){

 		Event.create({
 			name: eventToAdd.name,
 			description: eventToAdd.description,
 			date: eventToAdd.date,
 			lat: eventToAdd.lat,
 			lon: eventToAdd.lon,
 			requiresRegistration: eventToAdd.requiresRegistration,
 			address: address
 		}).then(function(model) {
 			console.log(model.name + ' on lisätty tietokantaan onnistuneesti!');
	      // Palauta vastauksena lisätty aihealue
	      res.send(model);
	  });
 	});

 },

 update: function (req, res) {
 	var controlId = req.params.id;
 	var requiredProps = ['name', 'description',]
 	Event.findOne({
 		where: { id: controlId}
 	}).then(function( event) {
 		event.name = req.body['name'];
 		event.description = req.body['description']
 		event.date = req.body['date']
 		event.lat = req.body['lat']
 		event.lon = req.body['lon']
 		event.requiresRegistration = req.body['requiresRegistration']
 		event.save(function(err) {
 			if (err) {
 				return res.send(err);
 			}
 			res.send(200);
 		});
 	});
 }

*/


};









/* ERRORIN KANSSA: */
/*
    findAll: function (req, res) {
        console.log("moiii")
        models.Event.findAll().then(function (error, events) {
            res.json(events);
        });
        
        if (error) {
            log.error(error, "error finding customers");
            res.status(500).send(error);
            return;
        }
        
  }

  */