var router = require("express").Router();
var Sequelize = require('sequelize')
var Promise = require('bluebird');

var validator = require("../../common/validators/validator.js")
var models  = require('../models');
var helper = require("../helpers/helper.js")
var CategoryService = require('../services/CategoryService.js');
var userService = require('../services/UserService.js');

var commonUtils = require("../../common/utils.js")
var commonConstatns = require("../../common/constants.js")
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

        var unixTimestampNow = Date.parse(new Date());
        
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
                ],
            where: {
                timestamp: {
                    $gte: unixTimestampNow
                }
            }
        }).then(function (events) {
            res.send(events);
        });
    },

    create: function (req, res) {
        console.log("___ Trying to create event")
        var eventToAdd = req.body;

        var eventValidationMsg = validateEvent(eventToAdd);

       if(eventValidationMsg.length == 0) {
            findCategory(eventToAdd.category).then(function(category) {
                if(category == null) {
                    helper.sendErr(res, 400, "Category by name " + eventToAdd.category + " not found.");
                }
                var success = function(user) {
                    var allowedError = isUserIsAllowedToCreateEvent(user, eventToAdd); // returns "" if all ok
                    if(allowedError.length != 0) {
                        console.log("___ User was not allowed to create event because of:");
                        console.log(allowedError);
                        helper.sendError(res, 400, allowedError);
                    } else if(user != null){
                        createEvent(req, res, category, user);
                    }else {
                        helper.sendError(res, 400, {user: "Not logged in"})
                    }
                }
                var error = function(err) {
                    helper.sendError(res, 400, {user: "Not logged in"})
                }
                userService.getLoggedInUser(req, res, success, error);
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
    var lat = eventToAdd.lat;
    var lon = eventToAdd.lon;

    var valid1 = validator.validateEventName(eventToAdd.name);
    var valid2 = validator.validateEventAddress(eventToAdd.address);
    var valid3 = validator.validateEventLatLng([lat, lon]);
    var valid4 = validator.validateEventTimestamp(eventToAdd.timestamp);
    var valid5 = validator.validateEventCategory(eventToAdd.category);
    var valid6 = validator.validateEventDescription(eventToAdd.description);

    // All of the validations must return an empty string
    if(valid1.length == 0 && valid2.length == 0 && valid3.length == 0 && valid4.length == 0 && valid5.length == 0 && valid6.length == 0) {
        // All OK
        console.log("___ Event was OK");
        return "";
    }
    console.log("___ Event was invalid");
    return "Form INVALID! name: " + valid1 + " address: " + valid2 + " latLng: " + valid3 + " timestamp: " + valid4 + " category: " + valid5 + " description: " + valid6;
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

// sends error if user is not allowed to create event
function isUserIsAllowedToCreateEvent(user, eventToAdd) {
    if (user.lastEventCreated != null) {
        var currentTime = new Date().getTime()/1000;
        var lastEventCreated = user.lastEventCreated.getTime()/1000;
        var sinceLastEventWasCreated = currentTime-lastEventCreated;
       // console.log("ROLEEEEEEEEEEEE");
        //console.log()
        if(user.trusted || user.role == "Admin") {
            var timeLeft = commonConstatns.trustedUserEventCreationDelay - sinceLastEventWasCreated;
            console.log("___ User was trusted or admin, trusted: " + user.trusted + " role: " + user.role);
            if(timeLeft < 0) {
                return "";
            } else {
                return "Events can be created every " + commonConstatns.trustedUserEventCreationDelay + " second for trusted users. Time left: " + timeLeft.toFixed(2) + " seconds.";
            }
        } else {
            console.log("___ User was untrusted, role: " + user.role);
            var timeLeft = commonConstatns.untrustedUserEventCreationDelay - sinceLastEventWasCreated;
            if(timeLeft < 0) {
                return "";
            } else {
                return "New events can be created every " + (commonConstatns.untrustedUserEventCreationDelay/60) + " minutes. Time left: " + timeLeft.toFixed(2) + " seconds.";
            }
        }
    }
    return "";
}

function createEvent(req, res, category, user) {
    console.log("___ At createEvent");
    var eventToAdd = req.body;
    models.Address.findOrCreate({where: {
            streetAddress: eventToAdd.address.streetAddress,
            country: eventToAdd.address.country,
            city: eventToAdd.address.city,
            zipCode: eventToAdd.address.zipCode
        }
    }).spread(function(address, created){
        var description = null;
        if(commonUtils.notEmpty(eventToAdd.description)){
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
               // console.log("user: " + user)
                event.setUser(user)     //this should say setCreator instead of setUser, but seems to work only this way, change it if you know how!
                console.log(event.name + ' created successfully');

                var success = function() {
                    models.Attendance.create({
                        eventId: event.id,
                        userId: user.id
                    }).then(function(){
                        res.send(event); 
                    }).catch(function(err){
                        //Creating the attendance failed for some reason, we can still send ok, adding the attendance is just extra
                        console.log("___ ERROR creating attendance for the event that was just created")
                        res.send(event); 
                    })
                }
                var error = function (){
                    helper.sendErr(res, 400, "Error: couldn't update lastEventCreated to user");
                }
                userService.updateLastEventCreated(req, res, success, error, user, new Date());


            }).catch(function(err){
                console.log("___ ERROR on creating event")
                console.log(err)
                helper.sendErr(res, 400, err);
            });

    }).catch(function(err){
        console.log("___ ERROR2 on creating event")
        console.log(err)
        helper.sendErr(res, 400, err);
    });

}