var router = require("express").Router();
var crypto = require('crypto');
var models  = require('../models');
var Sequelize = require('sequelize')

var helper = require("../helpers/helper.js")
var security = require("../helpers/security.js")
var validator = require("../../common/validators/validator.js")
var errorMessages = require("../../common/validators/errorMessage.js")
var utils = require("../../common/utils.js")
var constants = require("../helpers/constants.js")

var userService = require('../services/UserService.js');
var sessionService = require('../services/SessionService.js');
var emailService = require("../services/EmailService.js");


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

    findAttendeesByEvent: function(req, res){
        var eventId = req.params.id;

        models.User.findAll({
            attributes: ['id', 'username'],
            include: [{
                model: models.Attendance,
                attributes: ['comment'],
                where: {
                    eventId: eventId
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
    },

    create: function (req, res) {

        //Validate fields
        console.log("NEW USER TRYING TO SIGN UP")
        var userData = req.body;
        var userEmail = userData.email;
        var username = userData.username;
        var userPassword = userData.password;
        var repeatPassword = userData.repeatPassword;
        var validationErrors = {'userEmail': '', 'username':'', 'userPassword':'', 'userRepeatPassword': ''};
        
        validationErrors['userEmail'] = validator.validateEmail(userEmail)
        if(utils.notEmpty(username)){ //username is optional, only validate if the user has filled it
            validationErrors['username'] = validator.validateUsername(username);
        }
        validationErrors['userPassword'] = validator.validatePassword(userPassword)
        validationErrors['userRepeatPassword'] = validator.matchPasswords({"password":userPassword, "repeatPassword": repeatPassword});

        //Check that  the email is not in use
        models.User.count({
            where: { email: userEmail }
        }).then(function(count){
            if(count > 0){
                console.log("There is already a user in db with email " + userEmail)
                validationErrors['userEmail'] += errorMessages.getError('userEmailAlreadyInUse');
            }
            //Check that  the username is not in use
            models.User.count({
                where: { username: username }
            }).then(function(count){
                console.log("there are " + count + "users with this user name")
                if(count > 0){
                    console.log("There is already a user in db with username " + username)
                    validationErrors['username'] += errorMessages.getError('userUsernameAlreadyInUse');
                }

                //Check if there were any errors and send them back to the client if there were, otherwise continue
                if(!helper.sendErrorsIfFound(res, validationErrors) ){
                    //if false is returned no messages were sent, i.e. user input is valid and we can continue
                   if( utils.isEmpty(username) ){
                        models.User.findAll({
                            where:{
                                username: {
                                    $like: constants.anonymousBase + '%'
                                }
                            }
                        }).then(function(users){
                            var id = helper.generateNextId(users, constants.anonymousBase);
                            finishSignUp(req, res, 'Anonymous' + id);
                        })
                    }else{
                        finishSignUp(req, res, username);
                    }
                }
            });
              
        });
    },

    update: function (req, res) {
        console.log("UPDATE");

        var fieldToChange = req.body.fieldToChange;

        if(fieldToChange == "username") {
            changeUsername(req, res);
        } else if(fieldToChange == "password") {
            changePassword(req, res);
        } else {
            helper.sendError(res, 400, {"message": "Error in updating user. Give a proper fieldToChange to update user"});
        }
    },

    verifyEmail: function(req, res) {
        var verificationId = req.body.emailVerificationId;
        models.User.update({
            emailVerified: true
        },{
            where: { emailVerificationId : verificationId }
        })
        .then(function (result) {
            // result[0] == 1 means that email verification was successful
            if(result[0] == 1) {
                console.log("___ Email verificated");
                var success = function(user) {
                    var response = sessionService.updateLoginInfo(req, res, user);
                    res.status(200).send(response);
                }
                var error = function(err) {
                    console.log("___ Error on finding user after verifying user email:");
                    console.log(err);
                    helper.sendErr(res, 400, err);
                }

                userService.getLoggedInUser(req, res, success, error);
            } else {
                console.log("___ Error on verifying user email: user not found.");
                helper.sendErr(res, 400, "Error on verifying user email: verification link is invalid");
            }
        }, function(err){
            console.log("___ Error on verifying user email:");
            console.log(err);
            helper.sendErr(res, 400, err);
        });
    },

    sendVerificationEmail: function(req, res) {
        var success = function(user) {
            if(user.emailVerified) {
                console.log("___ Account already verified");
                helper.sendErr(res, 400, "Email of this account has already been verified. No need for verifying it again.");
            } else {
                if(user.countOfSentVerificationEmails < 10) {
                    finishSendingVerificationEmail(req, res, user);
                } else {
                    helper.sendErr(res, 400, "Maximum count of sent emails is exeeded. Can't send anymore emails. Contact us at our contact page if you have problems with verifying your email address.");
                }
            }
        }
        var error = function(err) {
            console.log("___ Error on finding user when trying to send verification email");
            console.log(err);
            helper.sendErr(res, 400, err);
        }
        userService.getLoggedInUser(req, res, success, error);
    },

    isEmailVerified: function(req, res) {

        var success = function(user) {
            console.log(user)
            if(user.emailVerified) {
                console.log("emailfverified")
                res.status(200).send({"success": "Email is verified"});
            } else {
                helper.sendErr(res, 400, {"error": "Email is not verified"});
            }
        }
        var error = function(err) {
            console.log("___ User should be logged in");
            helper.sendErr(res, 400, err);
        }

        userService.getLoggedInUser(req, res, success, error);
    }
};

//Called after validating all the user fields when we know that the user can really be created
function finishSignUp(req, res, username){
    var userData = req.body;
    var userEmail = userData.email;
    var userPassword = userData.password;

    //Callback that is called by the security component after the password has been hashed
    var createUser = function(salt, hash){
        var emailVerificationId = generateEmailVerificationId();

        models.User.create({
            username: username,
            email: userEmail, 
            password: hash,
            salt: salt,
            emailVerificationId: emailVerificationId,
            accountVerificated: false
        }).then(function(user){
            var response = sessionService.updateLoginInfo(req, res, user);
            emailService.sendVerificationEmail(userEmail, emailVerificationId, username);
            res.status(201).send(response);
        }).catch(function(err){
            console.log("ERROR:")
            console.log(err)
            helper.sendErr(res, 400, err);
        });
    };
    //Called if the hashing does not succeed for some reason. Don't know what could cause this
    var errorCallBack = function(err){
        helper.sendError(res, 400, {"message": "Unknown error in creating a user, please try again and report the error to the administrator if the error persists"});
    }
    security.hashPasswordWithGeneratedSalt(userPassword, errorCallBack, createUser);
}


function changeUsername(req, res) {
    var username = req.body.username;

    var validationErrors = {'username':'', 'repeatPassword': ''};
    validationErrors['username'] = validator.validateUsername(username);

    //Check if there were any errors and send them back to the client if there were, otherwise continue
    if(!helper.sendErrorsIfFound(res, validationErrors) ) {
        var notAuthorized = function(error) {
            helper.sendErr(res, 401, {"message": 'Not authorized'});
        }

        //main logic here
        var success = function(user) {

            var errorCallBack = function(err){
                helper.sendErr(res, 500, {"message": "Unknown error in logging in, please try again and report the error to the administrator if the error persists. Error code: 59003"});
            }

            models.User.count({
                where: { username: username }
            }).then(function(count){
                if(count > 0){
                    console.log("___ username already taken " + username)
                    validationErrors['username'] += errorMessages.getError('userChangeUsernameAlreadyInUse');
                }

                //Check if there were any errors and send them back to the client if there were, otherwise continue
                if(!helper.sendErrorsIfFound(res, validationErrors) ){
                    // if username is empty, generate new anonymous username
                   if( utils.isEmpty(username) ){
                        models.User.findAll({
                            where:{
                                username: {
                                    $like: 'Anonymous%'
                                }
                            }
                        }).then(function(users){
                            var id = helper.generateNextId(users);
                            finishUpdatingUsername(req, res, user, 'Anonymous' + id);
                        })
                    } else {
                        finishUpdatingUsername(req, res, user, username);
                    }
                }
            });
        }
        userService.getLoggedInUser(req, res, success, notAuthorized);
    }



}

function finishUpdatingUsername(req, res, user, username) {
    models.User.update({
        username: username
      },
      {
        where: { id : user.id }
      })
      .then(function (result) {
        console.log("___ Username updated");
        user.username = username;
        var response = sessionService.updateLoginInfo(req, res, user);
        res.status(201).send(response);
      }, function(err){
        console.log("___ Error on updating user:");
        console.log(err)
        helper.sendErr(res, 400, err);
      });
}

function changePassword(req, res) {
    var oldPassword = req.body.oldPassword;
    var password = req.body.password;
    var repeatPassword = req.body.repeatPassword;

    var validationErrors = {'password':'', 'repeatPassword': ''};
    validationErrors['password'] = validator.validatePassword(password);
    validationErrors['repeatPassword'] = validator.matchPasswords({"password":password, "repeatPassword": repeatPassword});

    //Check if there were any errors and send them back to the client if there were, otherwise continue
    if(!helper.sendErrorsIfFound(res, validationErrors) ) {
        console.log("___ Passwords were ok");
        var notAuthorized = function(error) {
            helper.sendErr(res, 401, {message: 'Not authorized'});
        }

        //main logic here
        var success = function(user) {

            var errorCallBack = function(err){
                helper.sendErr(res, 500, {"errorMessage": "Unknown error in logging in, please try again and report the error to the administrator if the error persists. Error code: 59011"});
            }
            //called by the security component with the salt and hash of the password
            var checkPassword = function(salt, oldPasswordHash){
                if( user.password === oldPasswordHash ) {

                    //Callback that is called by the security component after the password has been hashed
                    var updateUserPassword = function(salt, hash){
                        models.User.update({
                            password: hash,
                            salt: salt
                          },
                          {
                            where: { id : user.id }
                          })
                          .then(function (result) { 
                            res.status(200).send(result);
                          }, function(err){
                            console.log("ERROR:")
                            console.log(err)
                            helper.sendErr(res, 400, err);
                          });
                    };
                    //Called if the hashing does not succeed for some reason. Don't know what could cause this
                    var errorCallBack = function(err){
                        helper.sendError(res, 400, {"message": "Unknown error in creating a user, please try again and report the error to the administrator if the error persists. Error code: 59012"});
                    }
                    security.hashPasswordWithGeneratedSalt(password, errorCallBack, updateUserPassword);
                } else {
                    helper.sendError(res, 400, {changePasswordDetails: errorMessages.getError('userOldPasswordMissMatch')});
                }
            }
            security.hashPassword(oldPassword, user.salt, errorCallBack, checkPassword)
        }
        userService.getLoggedInUser(req, res, success, notAuthorized);
    }
}


function generateEmailVerificationId() {

    // TODO: Check if id already exists etc.
    var id = helper.makeId(75);
    return id;
}

function finishSendingVerificationEmail(req, res, user) {
    console.log("___ Sending another verification email");
    emailService.sendVerificationEmail(user.email, user.emailVerificationId, user.username);
    increaseSentEmailCount(user);
    res.status(200).send({"success": "Verification email has been sent"});
}

function increaseSentEmailCount(user) {
    var newCount = user.countOfSentVerificationEmails+1;
    models.User.update({
        countOfSentVerificationEmails: newCount
    },
    {
        where: { id : user.id }
    })
    .then(function (result) { 
          console.log("___ Increased countOfSentVerificationEmails by 1");
    }, function(err){
        console.log("___ Error on increasing countOfSentVerificationEmails")
        console.log(err)
    });
}
