var router = require("express").Router();
var Sequelize = require('sequelize')
var Promise = require('bluebird');

var models  = require('../models');
var helper = require("../helpers/helper.js")
var CategoryService = require('../services/CategoryService.js');

module.exports = {

    findOne: function (req, res) {
        var eventId = req.params.id;
        models.Event.findOne({
            where: { id: eventId },
            include: [ models.Address,
                      models.Attendance,
                      models.Category ]

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
        console.log("SESSION: ")
        console.log(req.session)
        models.Event.findAll({
            include: [ models.Address,
                  models.Attendance,
                  models.Category ]
        }).then(function (events) {
            req.write("testing....")
            res.send(events);
        });
    },

    filterEvents: function (req, res) {
        
        var categoryFilter = req.params.category;
        console.log("Category FILTER: " + categoryFilter);

        models.Event.findAll({
            include: [ models.Address,
                  models.Attendance,
                  { model: models.Category, where: {'name': categoryFilter} }
                  ]
        }).then(function (events) {
            res.send(events);
        });
    },

    create: function (req, res) {
        console.log("creating event: ")
        console.log(req.body)

        var eventToAdd = req.body;
        findCategory(eventToAdd.categoryName).then(function(category) {
            if(category == null) {
                console.log("CATEGORY NULL")
                helper.sendErr(res, 400, "Category by name " + eventToAdd.categoryName + " not found.");
            } else {
                console.log("FOUND CATEGORY, GONNA CREATE THE EVENT")
                createEvent(req, res, category);
            }
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

function findCategory(categoryName) {

    return new Promise(function(resolve, reject) {

        CategoryService.findByName(categoryName).then(function(category) {
            if(category == null) {
                CategoryService.findByName("Other").then(function(category) {
                    console.log(category);
                    if(category == null) {
                        reject(null);
                    } else {
                        resolve(category);
                    }
                });
            } else {
                resolve(category);
            }
        });
        
    });
}

function createEvent(req, res, category) {
    var eventToAdd = req.body;

    models.Address.findOrCreate({where: {
        streetAddress: eventToAdd.address.streetAddress,
        country: eventToAdd.address.country,
        city: eventToAdd.address.city,
        zipCode: eventToAdd.address.zipCode
    }

    }).spread(function(address, created){
        console.log("CREATED:")
        console.log(created)
        console.log("ADDRESS: ")
        console.log(address)
        models.Event.create({
            name: eventToAdd.name,
            description: eventToAdd.description,
            lat: eventToAdd.lat,
            lon: eventToAdd.lon,
            timestamp: eventToAdd.timestamp,
            CategoryId: category.id
            //requiresRegistration = eventToAdd.requiresRegistration,
            //maxAttendees = eventToAdd.maxAttendees
            }).then(function(event) {
                event.setAddress(address)
                console.log(event.name + ' created successfully');
                res.send(event); 
            }).catch(function(err){
                console.log("ERROR")
                console.log(err)
                helper.sendErr(res, 400, err);
            });

    }).catch(function(err){
        console.log("ERROR2")
        console.log(err)
        helper.sendErr(res, 400, err);
    });

}