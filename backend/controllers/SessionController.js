/*
We use client side sessions for authentication for now. The advantage is that we don't have to store the session
data to any database on the server. Express has a session component that stores the session data in memory by
default, but that won't work if the app is in cloud and might use multiple servers.

In the client side cookies we encrypt the cookie with a strong encryption, so that it cannot be tampered with.
We use a secret defined in the server.js to do the encryption. The strength of encryption is essential here,
because if the user can crack the encryption s/he can alter the cookie's contents, for example changing the 
user name we have stored there. The default encryption used by the client-sessions component should be more than 
enough. Changing the key that is used to encrypt the cookies invalidates all active client sessions. 
Cookies cannot carry much data, so we should not store much data in the sessions.

Later in case there are any problems or we need to save more data in the sessions, we can implement sessions
in server side by storing the session data in redis or mongo database for example. There are many examples of this
in the internet.

Sources:
https://hacks.mozilla.org/2012/12/using-secure-client-side-sessions-to-build-simple-and-scalable-node-js-applications-a-node-js-holiday-season-part-3/
http://www.eetimes.com/document.asp?doc_id=1279619
*/

var router = require("express").Router();
var models  = require('../models');
var helper = require("../helpers/helper.js")
var errorMessages = require("../../common/validators/errorMessage.js")
var security = require("../helpers/security.js")

const httpUnAuthorized = 401;

module.exports = {

    //login
    create: function(req, res){
        console.log("LOGGING IN")
        var userData = req.body;
        var email = userData.email;
        var password = userData.password;

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
                       /* req.seeyaSession.user = user;
                        delete req.user.password;
                        delete req.user.salt;*/
                        module.exports.addUserInfoInCookie(req.seeyaSession, user);
                        var response = {}
                        module.exports.addUserInfoInCookie(response, user);
                        helper.sendResponse(res, 200, response);
                    }else{
                        helper.sendErr(res, httpUnAuthorized, {message: errorMessages.getError('userEmailOrPasswordDontMatch')});
                    }
                }
                security.hashPassword(password, user.salt, errorCallBack, checkPassword)
            }else{
                helper.sendErr(res, httpUnAuthorized, {message: errorMessages.getError('userEmailOrPasswordDontMatch')});
            }
        });
    },

    logout: function(req, res){
        req.seeyaSession.reset();
        res.status(200).send({});
    },

    isLoggedIn: function(req, res){
        if( !req.seeyaSession.user ){
            console.log("UNAUTHORIZED")
            helper.sendErr(res, httpUnAuthorized, {message: errorMessages.getError('userNotAuthorized')});
        }else{
            console.log("Logged in user, email: " + req.seeyaSession.user.email)

            models.User.findOne({
                where: { email: req.seeyaSession.user.email }
            }).then(function (user) {
                module.exports.addUserInfoInCookie(req.seeyaSession, user);
                var response = {}
                module.exports.addUserInfoInCookie(response, user);
                helper.sendResponse(res, 200, response);
            }).catch(function(err){
                helper.sendResponse(res, 400, err);
            });
        }
    },

    addUserInfoInCookie: function(cookie, user){
        cookie.user = user;
        delete cookie.user.dataValues.password;
        delete cookie.user.dataValues.salt;
        console.log("COOKIE.USER")
        console.log(cookie.user)
    }
}