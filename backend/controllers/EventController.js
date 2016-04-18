var router = require("express").Router();
var Sequelize = require('sequelize')
var Promise = require('bluebird');

var Validator = require("../../common/validators/validator.js")
var models  = require('../models');
var helper = require("../helpers/helper.js")
var CategoryService = require('../services/CategoryService.js');
var userService = require('../services/UserService.js');
var utils = require("../../common/utils.js")

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
        models.Event.findAll({
            include: [ models.Address,
                  models.Attendance,
                  models.Category ]
        }).then(function (events) {
            res.send(events);
        });
    },

    filterEvents: function (req, res) {
        var categoryFilters = req.params.category;
        var filterArray = categoryFilters.split(",");
        
        var categoryFilters = [];
        for(var filter in filterArray) {
            var obj = {name: filterArray[filter]}
            categoryFilters.push(obj);
        }
        models.Event.findAll({
            include: [ models.Address,
                    models.Attendance,
                    { model: models.Category, where: {
                            $or: categoryFilters
                        }
                    }
                ]
        }).then(function (events) {
            res.send(events);
        });
    },

    create: function (req, res) {
        console.log("creating event: ")
        var eventToAdd = req.body;

        var eventValidationMsg = validateEvent(eventToAdd);
        console.log("Event validation msg:-----");
        console.log(eventValidationMsg);

        if(eventValidationMsg.length == 0) {

            findCategory(eventToAdd.category).then(function(category) {
                if(category == null) {
                    console.log("CATEGORY NULL")
                    helper.sendErr(res, 400, "Category by name " + eventToAdd.category + " not found.");
                } else {
                    console.log("FOUND CATEGORY, GONNA CREATE THE EVENT")
                    var success = function(user){
                        createEvent(req, res, category, user);
                    }
                    var error = function(err){
                        createEvent(req, res, category, null);
                    }
                    userService.getLoggedInUser(req, res, success, error);
                }
            });
        } else {
            helper.sendErr(res, 400, eventValidationMsg);
        }
    },

    update: function (req, res) {
        var controlId = req.params.id;
        var eventToModify = req.body;

        //called if the user is not logged in or 
        var notAuthorized = function(error){
            helper.sendErr(res, 401, {message: 'Not authorized'});
        }

        //main logic here
        var success = function(user){
            models.Event.findOne({
                where: { id: controlId}
            }).then(function( event) {
                if(user !== null && event.get('creator') === user.get('id')){
                    models.Address.findOrCreate({
                        where: {
                            streetAddress: eventToModify.address.streetAddress,
                            country: eventToModify.address.country,
                            city: eventToModify.address.city,
                            zipCode: eventToModify.address.zipCode
                        }
                    }).spread(function(address, created){
                        event.setAddress(address)
                        event.name = req.body['name'];
                        event.description = req.body['description']
                        event.lat = req.body['lat']
                        event.lon = req.body['lon']
                        event.timestamp = req.body['timestamp']
                        //  event.requiresRegistration = req.body['requiresRegistration']
                        event.save().then(function(savedEvent) {      //check that the saved event variable works
                            res.status(201).send(savedEvent);
                        }).catch(function(err){
                            helper.sendErr(res, 400, err);
                        })

                    }).catch(function(err){
                        //Something wrong in creating or getting the address if we end up here
                        helper.sendErr(res, 400, err);
                    });
                }else{  //The logged in user has not created the event
                    notAuthorized();
                }
            }).catch(function(err){
                helper.sendErr(res, 400, err);
            });
        }


        userService.getLoggedInUser(req, res, success, notAuthorized);
    },

    delete: function(req, res){
         console.log("")
         console.log("")
         console.log("")
         console.log("")
         console.log("")
        console.log("AT DELETE EVENT")
        //called if the user is not logged in or 
        var notAuthorized = function(error){
            helper.sendResponse(res, 401, {message: 'Not authorized'});
        }

        //main logic here
        var success = function(user){
            if( user!= null ){
                var eventId = req.params.id;
                models.Event.findOne({
                    where: { id: eventId}
                }).then(function( event ) {
                        if(event !== null){
                            if( event.get('creator') === user.id || user.role === 'Admin'){
                            event.destroy().then(function(){
                                res.status(200).send();
                            }).catch(function(err){
                                helper.sendResponse(res, 400, err);
                            });
                        }else{  //user hasn't created this event
                            notAuthorized();
                        }
                    }else{
                        helper.sendResponse(res, 401, {message: 'Event does not exist'});
                    }
                })
            }else{  //not logged in at all
                notAuthorized();
            }
        }
        userService.getLoggedInUser(req, res, success, notAuthorized);
    },
};

function validateEvent(eventToAdd) {

    console.log("at validateEvent");
    console.log(eventToAdd);

    var lat = eventToAdd.lat;
    var lon = eventToAdd.lon;

    var valid1 = Validator.validateEventName(eventToAdd.name);
    var valid2 = Validator.validateEventAddress(eventToAdd.address);
    var valid3 = Validator.validateEventLatLng([lat, lon]);
    var valid4 = Validator.validateEventTimestamp(eventToAdd.timestamp);
    var valid5 = Validator.validateEventCategory(eventToAdd.category);
    var valid6 = Validator.validateEventDescription(eventToAdd.description);

    // All of the validations must return an empty string
    if(valid1.length == 0 && valid2.length == 0 && valid3.length == 0 && valid4.length == 0 && valid5.length == 0 && valid6.length == 0) {
        // All OK
        return "";
    }
    return "... Form INVALID! name: " + valid1 + " address: " + valid2 + " latLng: " + valid3 + " timestamp: " + valid4 + " category: " + valid5 + " description: " + valid6;
}




function findCategory(categoryName) {
    return new Promise(function(resolve, reject) {
        CategoryService.findByName(categoryName).then(function(category) {
            if(category == null) {
                reject(null);
            } else {
                resolve(category);
            }
        });
        
    });
}

function createEvent(req, res, category, user) {
    var eventToAdd = req.body;
    models.Address.findOrCreate({where: {
        streetAddress: eventToAdd.address.streetAddress,
        country: eventToAdd.address.country,
        city: eventToAdd.address.city,
        zipCode: eventToAdd.address.zipCode
    }

    }).spread(function(address, created){
        var description = null;
        if(utils.notEmpty(eventToAdd.description)){
            description = eventToAdd.description;
        }

        models.Event.create({
            name: eventToAdd.name,
            lat: eventToAdd.lat,
            lon: eventToAdd.lon,
            description: description,
            timestamp: eventToAdd.timestamp,
            CategoryId: category.id
            //requiresRegistration = eventToAdd.requiresRegistration,
            //maxAttendees = eventToAdd.maxAttendees
            }).then(function(event) {
                event.setAddress(address)
                console.log("user: " + user)
                event.setUser(user)     //this should say setCreator instead of setUser, but seems to work only this way, change it if you know how!
                console.log(event.name + ' created successfully');

                models.Attendance.create({
                    eventId: event.id,
                    userId: user.id
                }).then(function(){
                    res.send(event); 
                }).catch(function(err){
                    //Creating the attendance failed for some reason, we can still send ok, adding the attendance is just extra
                    console.log("ERROR creating attendance for the event that was just created")
                    res.send(event); 
                })
            }).catch(function(err){
                console.log("... ERROR on creating event")
                console.log(err)
                helper.sendErr(res, 400, err);
            });

    }).catch(function(err){
        console.log("... ERROR2 on creating event")
        console.log(err)
        helper.sendErr(res, 400, err);
    });

}