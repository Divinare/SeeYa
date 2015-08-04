var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize')

module.exports = {

  findOne: function (req, res) {
     var eventId = req.params.id;
     models.Event.findOne({
        where: { id: eventId },
        include: [ models.Address,
                  models.Attendance ]
        
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
    models.Event.findAll({
      include: [ models.Address,
                  models.Attendance ]
  }).then(function (events) {
        /*
          if (error) {
            res.status(500).send(error);
            return;
          }
          */
          res.send(events);
      });
},

create: function (req, res) {
 var eventToAdd = req.body;
 console.log(eventToAdd)
 console.log(eventToAdd.address)
 console.log("time stamp" + eventToAdd.timestamp)

 models.Address.findOrCreate({where: {
    streetAddress: eventToAdd.address.streetAddress,
    country: eventToAdd.address.country,
    zipCode: eventToAdd.address.zipCode
}

}).spread(function(address, created){
  console.log("--------------------------------------------------------")
  console.log("address id: " + address.id)
  console.log(address)
  console.log("created: " + created)

  console.log("------------------------------------------------------------")
  models.Event.create({
    name: eventToAdd.name,
    description: eventToAdd.description,
    lat: eventToAdd.lat,
    lon: eventToAdd.lon,
    timestamp: eventToAdd.timestamp,
          //requiresRegistration = eventToAdd.requiresRegistration,
      }).then(function(event) {
          event.setAddress(address)
          console.log(event.name + ' created successfully');
          res.send(event);
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