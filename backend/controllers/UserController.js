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

    //TODO make this shorter, validation in its own function for example
    create: function (req, res) {
        console.log("NEW USER TRYING TO SIGN UP")
        var addErrorsIfNotEmpty = module.exports.addErrorsIfNotEmpty;
        var addErrorIfNotEmpty = module.exports.addErrorIfNotEmpty;
        var userData = req.body;
        var userEmail = userData.email;
        var userPassword = userData.password;
        var repeatPassword = userData.repeatPassword;
        var validationErrors = {'userEmail':[],'userPassword':[]};
        addErrorsIfNotEmpty(validationErrors['userEmail'], validator.validateEmail(userEmail));
        addErrorIfNotEmpty(validationErrors['userPassword'], validator.matchPasswords({"password":userPassword, "repeatPassword": repeatPassword}));
        addErrorIfNotEmpty(validationErrors['userPassword'], validator.validatePassword(userPassword));

        //Callback that is called by the security component after the password has been hashed
        var createUser = function(salt, hash){
            console.log("CREATE USER CALLED")
            var endTime = new Date().getTime();
           // console.log("hashing took: " + (endTime - startTime) + "ms" );
            models.User.create({
                username: userEmail,
                email: userEmail, 
                password: hash,
                salt: salt
            }).then(function(user){
                var response = sessionService.login(req, res, user);
                res.status(201).send(response);
            }).catch(function(err){
                helper.sendErr(res, 400, err);
            });
        };
        //Called if the hashing does not succeed for some reason. Don't know what could cause this
        var errorCallBack = function(err){
            console.log("caught error!!!!")
            helper.sendErr(res, 400, {"message": "Unknown error in creating a user, please try again and report the error to the administrator if the error persists"});
        }

        models.User.findOne({
            where: { email: userEmail }
        })
        .then(function (user) {
            if(user){   //user found
                console.log("user found")
                validationErrors['userEmail'].push(errorMessages.getError('userEmailAlreadyInUse'))
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
                helper.sendErrJsonObj(res, 400, validationErrors);
                return;
            }
            // var startTime = new Date().getTime();
            security.hashPasswordWithGeneratedSalt(userPassword, errorCallBack, createUser);
            
        });
    },

    addErrorIfNotEmpty: function(array, errorMsg){
        if(utils.notEmpty(errorMsg)){
            array.push(errorMsg);
        }
    },
    addErrorsIfNotEmpty: function(array, errorArr){
        if(errorArr.length > 0){
            array.concat(errorArr);
        }
    },
};



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