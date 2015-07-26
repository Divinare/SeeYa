var router = require("express").Router();
var models  = require('../models');

module.exports = {

 	findOne: function (req, res) {
 		var eventId = req.params.id;
 		models.Event.findOne({
 			where: { id: eventId }
 		})
 		.then(function (event) {
 			res.send(event);
 		});
 	},

  /*
    findOne: function (req, res) {
    console.log("FIND ONE?");
    var eventId = req.params.id;
    models.Event.findOne({
      where: { id: eventId }
    }).populate('address')
    .then(function (event) {
      console.log(event);
      res.send(event);
    });
  },
  */

  findAll: function (req, res) {
      models.Event.findAll().then(function (error, events) {
          if (error) {
            res.status(500).send(error);
            return;
          }
          res.json(events);
      });
  },
 	 
  create: function (req, res) {
  	var eventToAdd = req.body;
  	console.log(eventToAdd.address)

    models.Address.create({
    	streetAddress: eventToAdd.address.streetAddress,
      country: eventToAdd.address.country,
      zipCode: eventToAdd.address.zipCode
    }).then(function(address){

    models.Event.create({
  		name: eventToAdd.name,
  		description: eventToAdd.description,
  		date: eventToAdd.date,
  		lat: eventToAdd.lat,
  		lon: eventToAdd.lon,
      time: eventToAdd.time,
      //requiresRegistration = eventToAdd.requiresRegistration,
    	address: address
      }).then(function(model) {
    		console.log(model.name + ' created successfully');
        // Palauta vastauksena lisätty aihealue
        res.send(model);
      });
    });
 },

 update: function (req, res) {
 	var controlId = req.params.id;
 	var requiredProps = ['name', 'description',]
 	models.Event.findOne({
 		where: { id: controlId}
 	}).then(function( event) {
 		event.name = req.body['name'];
 		event.description = req.body['description']
 		event.date = req.body['date']
 		event.lat = req.body['lat']
 		event.lon = req.body['lon']
 	//	event.requiresRegistration = req.body['requiresRegistration']
 		event.save(function(err) {
 			if (err) {
 				return res.send(err);
 			}
 			res.send(200);
 		});
 	});
 }

};