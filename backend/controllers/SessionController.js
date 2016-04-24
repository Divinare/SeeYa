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
var sessionService = require("../services/SessionService.js")
var constants = require("../helpers/constants.js")

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
                    helper.sendErr(res, 500, {"errorMessage": "Unknown error in logging in, please try again and report the error to the administrator if the error persists"});
                }
                //called by the security component with the salt and hash of the password
                var checkPassword = function(salt, hash){
                    if( user.password === hash ){
                        console.log("login success")
                       /* req.seeyaSession.user = user;
                        delete req.user.password;
                        delete req.user.salt;
                        module.exports.addUserInfoInCookie(req.seeyaSession, user);
                        var response = {}
                        module.exports.addUserInfoInCookie(response, user);
                        helper.sendResponse(res, 200, response);*/
                        var response = sessionService.login(req, res, user);
                        helper.sendResponse(res, 200, response);
                    }else{
                        helper.sendError(res, httpUnAuthorized, {loginDetails: errorMessages.getError('userEmailOrPasswordDontMatch')});
                    }
                }
                security.hashPassword(password, user.salt, errorCallBack, checkPassword)
            }else{
                helper.sendError(res, httpUnAuthorized, {loginDetails: errorMessages.getError('userEmailOrPasswordDontMatch')});
            }
        });
    },

    /** 
    This method should never return anything but null in the first parameter of the done callback. If something
    else is returned, it is handled by passport and the user will just see a text 'unauthorized', or something like
    that. In case of an error put in the req object an error message with key 'authError'. In these cases
    we redirect the user to the authError component in UI, which shows the error message and redirects the user.
    Also for the same reason the second parameter for the done callback should not be false or null, but some
    object (or true).

    The done callback is described here: http://passportjs.org/docs/authorize Notice though that we are not using
    passport methods in case of an error but we handle those cases ourselves as described above. 
    **/
    loginOAuth: function(req, accessToken, refreshToken, profile, done ){
        console.log("AUTHENTICATING...")
        console.log(profile)
        //I don't know if it can really be null, but if it is something probably failed
        if( profile == null ){  
            req.authError = 'No information received from the authentication provider.';
            return done(null, true);
        }

        //Check whether there are other seeya users who have the same email as this user has in fb
        var emails = [];
        profile.emails.forEach(function(entry){
            emails.push(entry.value)
        });

        models.User.findAll({
            where: {
                email: emails,
                authProvider: null
            }
        }).then(function(users){
            if(users != null && users.length > 0){
                //Take the first found user and associate it with the facebook account
                var user = users[0];
                user.authProvider = profile.provider;
                user.authProvUserId = profile.id;
                user.save().then(function(savedUser){
                    var response = sessionService.login(req, null, savedUser);
                    console.log("fb account associated with existing user!")
                    return done(null, response);
                }).catch(function(err){
                    if(err.message != null){
                        req.authError = err.message;
                        return done(null, true);
                    }else{
                       return done(err)  //error in connecting to database for example
                    }   
                })
            }else{
                var displayName = profile.displayName
                var username = null

                if( displayName == null ){
                    //make user anonymous if for some reason the displayname is null or undefined
                    username = constants.anonymousBase;    
                }else if( displayName.indexOf(' ') === -1 ){  //if there is no space in the display name use all of it
                    username = displayName
                }else{  //displayName not null and has a space --> use the part before space as the username
                     username = displayName.substr(0, displayName.indexOf(' '));
                }

                models.User.findOne({
                    where: { 
                        authProvider: profile.provider,
                        authProvUserId: profile.id
                    }
                }).then(function(user){
                    if(user == null){
                        models.User.findAll({
                            where:{
                                username: {
                                    $like: username + '%'
                                }
                            }
                        }).then(function(users){
                            var id = helper.generateNextId(users, username);
                            var userFields = {
                                username: username + id,
                                authProvider: profile.provider,
                                authProvUserId: profile.id
                            }
                            console.log("profile email")
                            console.log(profile.email)
                            console.log(profile.emails[0])
                            console.log(profile.emails[0].value)
                            if(profile.emails != null && profile.emails[0] != null && profile.emails[0].value != null){
                                userFields.email = profile.emails[0].value
                            }

                            models.User.create(userFields).then(function(user){
                                var response = sessionService.login(req, null, user);
                                console.log("user created!!!!")
                                return done(null, response);
                            }).catch(function(err){
                                console.log("ERROR:")
                                console.log(err)
                                if(err.message != null){
                                    req.authError = err.message;
                                     return done(null, true);
                                }else{
                                   return done(err)  
                                }   
                            });

                        }).catch(function(err){
                            if(err.message != null){
                                req.authError = err.message;
                                return done(null, true);
                            }else{
                               return done(err)  //error in connecting to database for example
                            }
                        });

                    }else{
                        console.log("fb user found in db")
                        var response = sessionService.login(req, null, user);
                        return done(null, response); //user found in database, only have to log him/her in
                    }
                }).catch(function(err){
                   if(err.message != null){
                        req.authError = err.message;
                        return done(null, true);
                    }else{
                       return done(err)  //error in connecting to database for example
                    }   
                });

            }
        }).catch(function(err){
            if(err.message != null){
                req.authError = err.message;
                return done(null, true);
            }else{
               return done(err)  //error in connecting to database for example
            }
        });
    },

    oAuthSuccess: function(req, res){
        console.log("oauth authentication successful");
        res.redirect("/");
    },

    oAuthError: function(req, res){
        console.log("oauth authentication error");
        console.log(req.authError)
       /* console.log("res")
        console.log(res)
        console.log("req")
        console.log(req)*/
       // res.redirect("")
        res.redirect("/authError/" + req.authError)
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
    }
}