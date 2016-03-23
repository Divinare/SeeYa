var router = require("express").Router();
var models  = require('../models');
var helper = require("../helpers/helper.js")
var errorMessages = require("../../common/validators/errorMessage.js")
var security = require("../helpers/security.js")


module.exports = {

    //login
    create: function(req, res){
        console.log("LOGGING IN")
        var userData = req.body;
        var email = userData.email;
        var password = userData.password;
        var httpUnAuthorized = 401;

        models.User.findOne({
            where: { email: email }
        }).then(function (user) {
            if(user){   //user found
                //Called if the hashing does not succeed for some reason. Don't know what could cause this
                var errorCallBack = function(err){
                    console.log("caught error!!!!")
                    helper.sendErr(res, 500, {"message": "Unknown error in logging in, please try again and report the error to the administrator if the error persists"});
                }
                //called by the security component with the salt and hash of the password
                var checkPassword = function(salt, hash){
                    if( user.password == hash ){
                        console.log("login success")
                        //TODO CREATE THE SESSION
                        res.status(200).send({});
                    }else{
                        helper.sendErr(res, httpUnAuthorized, {message: errorMessages.getError('userEmailOrPasswordDontMatch')});
                    }
                }


                security.hashPassword(password, user.salt, errorCallBack, checkPassword)
            }else{
                helper.sendErr(res, httpUnAuthorized, {message: errorMessages.getError('userEmailOrPasswordDontMatch')});
            }
        });

    }
}