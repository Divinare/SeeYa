var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize')
var helper = require("../helpers/helper.js")

module.exports = {

    findOne: function (req, res) {
        var eventId = req.params.id;
        models.Event.findOne({
            where: { id: eventId },
            include: [ models.Address,
                      models.Attendance ]

        })
        .then(function (event) {
            if(event){
                res.send(event);
            }else{
                //means not found. Usually if the web page is not found, but should be suitable in this situation as well
                res.sendStatus(404); 
            }
        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    },  

    findAll: function (req, res) {
        models.Event.findAll({
            include: [ models.Address,
                  models.Attendance ]
        }).then(function (events) {
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
            city: eventToAdd.address.city,
            zipCode: eventToAdd.address.zipCode
        }

        }).spread(function(address, created){
            models.Event.create({
                name: eventToAdd.name,
                description: eventToAdd.description,
                lat: eventToAdd.lat,
                lon: eventToAdd.lon,
                timestamp: eventToAdd.timestamp,
                //requiresRegistration = eventToAdd.requiresRegistration,
                //maxAttendees = eventToAdd.maxAttendees
                }).then(function(event) {
                    event.setAddress(address)
                    console.log(event.name + ' created successfully');
                    res.send(event); 
                }).catch(function(err){
                    helper.sendErr(res, 400, err);
                });

        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    },

    //TODO: add check that the user is signed in and the creator of the event
    update: function (req, res) {
        var controlId = req.params.id;
        var eventToModify = req.body;
       // var requiredProps = ['name', 'description',]
        models.Address.findOrCreate({
            where: {
                streetAddress: eventToModify.address.streetAddress,
                country: eventToModify.address.country,
                city: eventToModify.address.city,
                zipCode: eventToModify.address.zipCode
            }
        }).spread(function(address, created){
           models.Event.findOne({
                where: { id: controlId}
            }).then(function( event) {
                event.setAddress(address)
                event.name = req.body['name'];
                event.description = req.body['description']
                event.lat = req.body['lat']
                event.lon = req.body['lon']
                event.timestamp = req.body['timestamp']
                //  event.requiresRegistration = req.body['requiresRegistration']
                event.save().then(function(savedEvent) {      //check that the saved event variable works
                    res.status(200).send(savedEvent);
                }).catch(function(err){
                    helper.sendErr(res, 400, err);
                })
            }).catch(function(err){
                helper.sendErr(res, 400, err);
            });
        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    },

    //TODO: add check that the user is signed in and the creator of the event
    delete: function(req, res){
        var eventId = req.params.id;
        models.Event.destroy({
            where: {
            id: eventId
            }
        }).then(function(){
            res.status(200).send();
        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    }

   /* sendErr: function(statusCode, err){
        res.status(statusCode).send(err.message);
    }*/
};