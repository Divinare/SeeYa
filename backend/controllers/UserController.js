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
        console.log("CREATING USER")
        var userData = req.body;
        var email = userData.email;
        var password = userData.password;
        var repeatPassword = userData.repeatPassword;

        var emailValidationError = validator.validateEmail(email);
        var passwordValidationError = validator.matchPasswords({"password":password, "repeatPassword": repeatPassword});
        
        var createUser = function(salt, hash){
            var endTime = new Date().getTime();
           // console.log("hashing took: " + (endTime - startTime) + "ms" );
            models.User.create({
                username: email,
                email: email, 
                password: hash,
                salt: salt
            }).then(function(user){
                res.status(201).send({});
            }).catch(function(err){
                helper.sendErr(res, 400, err);
            });
        }

        if( utils.notEmpty(passwordValidationError) ){
            helper.sendErr(res, 400, {"message": "Passwords don't match!"}); //code 400 = bad request
            return;
        }
        if( utils.notEmpty(emailValidationError) ){
            helper.sendErr(res, 400, {"message": "Email not valid!"});
            return;
        }

        models.User.findOne({
            where: { email: email }
        })
        .then(function (user) {
            if(user){   //user found
                helper.sendErr(res, 400, {"message": "Email already in use"});
                return;
            }else{
               // var startTime = new Date().getTime();
                security.hashPassword(password, createUser);
            }
        });
    },
};