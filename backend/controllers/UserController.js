var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize')
var helper = require("../helpers/helper.js")
var security = require("../helpers/security.js")
var validator = require("../../common/validators/validator.js")
var utils = require("../../common/utils.js")
var crypto = require('crypto');

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
        var userData = req.body;
        var userEmail = userData.email;
        var userPassword = userData.password;
        var repeatPassword = userData.repeatPassword;
        var validationErrors = {'email':'','password':'', 'emailInUse':''};
        validationErrors['email'] = validator.validateEmail(userEmail).join(', ');
        validationErrors['password'] = validator.matchPasswords({"password":userPassword, "repeatPassword": repeatPassword});
        validationErrors['passwordFormat'] = validator.validatePassword(userPassword);

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
                res.status(201).send({});
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
                validationErrors['emailInUse'] = "Email already in use";
            }
            //Check if there were any errors and send them back to the client if there were
            var errorCount = 0;
            for (var property in validationErrors) {
                if (validationErrors.hasOwnProperty(property)) {
                    if( utils.notEmpty(validationErrors[property]) ){
                        errorCount++;
                    }else{
                        delete validationErrors[property]
                    }
                }
            }
              console.log("looped")
            if( errorCount > 0 ){
                helper.sendErrJsonObj(res, 400, validationErrors);
                return;
            }
            // var startTime = new Date().getTime();
            security.hashPasswordWithGeneratedSalt(userPassword, errorCallBack, createUser);
            
        });
    },
};