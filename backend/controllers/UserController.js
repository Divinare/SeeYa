var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize')
var helper = require("../helpers/helper.js")
var security = require("../helpers/security.js")
var validator = require("../../common/validators/validator.js")
var errorMessages = require("../../common/validators/errorMessage.js")
var utils = require("../../common/utils.js")
var crypto = require('crypto');
var userService = require('../services/UserService.js');
var sessionService = require('../services/SessionService.js');

module.exports = {
    anonymousBase: 'Anonymous',

    findOne: function (req, res) {
        var userId = req.params.id;
        models.User.findOne({
            where: { id: userId },
        })
        .then(function (user) {
        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    },  

    findAttendeesByEvent: function(req, res){
        console.log("FIND EVENT ATTENDEES")
        var eventId = req.params.id;

        models.User.findAll({
            attributes: ['id', 'username'],
            include: [{
                model: models.Attendance,
                attributes: ['comment'],
                where: {
                    EventId: eventId
                },
            }],
            raw: true   //we don't want instances, just the plain data
        }).then(function(attendees){
            var response = {};
            response.users = attendees;
            res.status(200).send(response);
        }).catch(function(err){
            console.log("error")
            console.log(err)
            res.status(500).send(err);
        });





       /* models.Attendance.findAll({
            where: { EventId: eventId },
            include: [ models.User ]
        }).then(function (attendances) {
            console.log("ATTENDANCES")
            console.log(attendances)
            res.status(200).send({});
        }).catch(function(err){
            res.status(500).send(error);
        });*/
    },

    //TODO make this shorter, validation in its own function for example
    create: function (req, res) {
        //Validate fields
        console.log("NEW USER TRYING TO SIGN UP")
        var addErrorsIfNotEmpty = module.exports.addErrorsIfNotEmpty;
        var addErrorIfNotEmpty = module.exports.addErrorIfNotEmpty;
        var userData = req.body;
        var userEmail = userData.email;
        var username = userData.username;
        var userPassword = userData.password;
        var repeatPassword = userData.repeatPassword;
        var validationErrors = {'userEmail':[], 'username':[], 'userPassword':[], 'userRepeatPassword': []};
        validationErrors['userEmail'] = addErrorsIfNotEmpty(validationErrors['userEmail'], validator.validateEmail(userEmail));
        if(utils.notEmpty(username)){ //username is optional, only validate if the user has filled it
            validationErrors['username'] = addErrorsIfNotEmpty(validationErrors['username'], validator.validateUsername(username));
        }
        addErrorIfNotEmpty(validationErrors['userPassword'], validator.validatePassword(userPassword));
        addErrorIfNotEmpty(validationErrors['userRepeatPassword'], validator.matchPasswords({"password":userPassword, "repeatPassword": repeatPassword}));

        console.log("validationerrors: ")
        console.log(validationErrors)
        //Check that  the username is not in use
        models.User.count({
            where: { email: userEmail }
        }).then(function(count){
            if(count > 0){
                console.log("There is already a user in db with email " + userEmail)
                validationErrors['userEmail'].push(errorMessages.getError('userEmailAlreadyInUse'))
            }
            models.User.count({
                where: { username: username }
            }).then(function(count){
                if(count > 0){
                    console.log("There is already a user in db with username " + username)
                    validationErrors['username'].push(errorMessages.getError('userUsernameAlreadyInUse'))
                }

                //Check if there were any errors and send them back to the client if there were
                var errorCount = 0;
                for (var property in validationErrors) {
                    if (validationErrors.hasOwnProperty(property)) {
                        if( validationErrors[property].length > 0 ){
                            errorCount++;
                        }else{
                            delete validationErrors[property]
                        }
                    }
                }
                if( errorCount > 0 ){
                    helper.sendError(res, 400, validationErrors);
                    return;
                }

                if( utils.isEmpty(username) ){
                    models.User.findAll({
                        where:{
                            username: {
                                $like: 'Anonymous%'
                            }
                        }
                    }).then(function(users){
                        var id = generateNextId(users);
                        finishSignUp(req, res, 'Anonymous' + id);
                    })
                }else{
                    finishSignUp(req, res, username);
                }
            });
              
        });
    },

    addErrorIfNotEmpty: function(array, errorMsg){
        if(utils.notEmpty(errorMsg)){
            array.push(errorMsg);
        }
    },

    addErrorsIfNotEmpty: function(array, errorArr){
        if(errorArr.length > 0){
            array = array.concat(errorArr);
        }
        return array;
    },
};

//Called after validating all the user fields when we know that the user can really be created
function finishSignUp(req, res, username){
    var userData = req.body;
    var userEmail = userData.email;
    var userPassword = userData.password;

    //Callback that is called by the security component after the password has been hashed
    var createUser = function(salt, hash){
        console.log("CREATE USER CALLED")
        var endTime = new Date().getTime();
        // console.log("hashing took: " + (endTime - startTime) + "ms" );
        models.User.create({
            username: username,
            email: userEmail, 
            password: hash,
            salt: salt
        }).then(function(user){
            var response = sessionService.login(req, res, user);
            res.status(201).send(response);
        }).catch(function(err){
            console.log("ERROR:")
            console.log(err)
            helper.sendErr(res, 400, err);
        });
    };
    //Called if the hashing does not succeed for some reason. Don't know what could cause this
    var errorCallBack = function(err){
        console.log("caught error!!!!")
        helper.sendError(res, 400, ["message": "Unknown error in creating a user, please try again and report the error to the administrator if the error persists"]);
    }

    // var startTime = new Date().getTime();
    security.hashPasswordWithGeneratedSalt(userPassword, errorCallBack, createUser);
}

//Gets a list of users with username like 'Anonymous%'
//Parses the usernames to find the first free id (e.g. for users Anonymous1 and Anonymous4, id 2 would be returned)
function generateNextId(users){
    console.log("generating anonymous id")
    if( users == null) {
        return 1;
    }

    var ids = [];
    for( var i = 0; i < users.length; i++){
        var ending = users[i].get('username').replace('Anonymous','');
        var endingAsInt = parseInt(ending);
        if(!isNaN(endingAsInt)){
            ids.push(endingAsInt)
        }
    }
    if(ids.length === 0){
        return 1;
    }
    ids.sort(sortNumerically);

    for( var i= 0; i < ids.length; i++ ){
        var id = ids[i];
        if( i < ids.length && id + 1 !== ids[i + 1]){    //if id + 1 is not found in the id list we can use it
            return id + 1;
        }
    }
    return (ids[ids.length - 1] + 1)
}

//needed because javascript sort method treats the values as text by default
function sortNumerically(a, b){
    return a - b;
}


  /* findUserEvents: function(req, res){
        var findEvents = function(user){
            models.User.findOne({
            where: { email: user.email },
                include: [ models.Event ]  //events the user has created
            }).then(function (user) {
                console.log("user");
                console.log(user);
                console.log('')
                console.log('')
                console.log('')
                console.log('')
                console.log("EVENTS")
                var events = user.Events;
                console.log(user.Events);

                console.log('')
                console.log('')
                console.log('')
                console.log('')
                console.log("EVENT NAMES")
                console.log(events[0].get('name'))
                console.log(events[1].get('name'))
                res.status(200).send(events);
            });
        }
        var error = function(err){
            console.log("user is not logged in");
            helper.sendErr(res, 401, err);
        }
        userService.getLoggedInUser(req, res, findEvents, error);

    },*/