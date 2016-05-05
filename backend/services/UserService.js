var router = require("express").Router();
var models  = require('../models');

var sessionService = require('./SessionService.js');

module.exports = {
    getLoggedInUser: function(req, res, success, error){
        console.log("___ Trying to get logged user");
        if( !req.seeyaSession.user ){
            console.log("___ Error: user wasn't logged in");
            error({message: "user is not logged in"});
        }else{
            console.log("___ User was logged in, email: " + req.seeyaSession.user.email);
            models.User.findOne({
                where: { email: req.seeyaSession.user.email }
            }).then(function (user) {
                console.log("___ User found");
                success(user);
                return null;
            }).catch(function(err){
                console.log("___ Programmer, ERROR! Fix this:");
                console.log(err);
                error(err);
            });
        }
    },

    /********************
     Update user methods
    *********************/
    updateLastEventCreated: function(req, res, success, error, user, date) {
    console.log("___ At updateLastEventCreated");

        models.User.update({
            lastEventCreated: date
          },
          {
            where: { id : user.id }
          })
          .then(function (result) {
            console.log("___ User lastEventCreated updated");
            user.lastEventCreated = date;
            var response = sessionService.updateLoginInfo(req, res, user);
            res.status(201).send(response);
          }, function(err){
            console.log("___ Error on updating user:");
            console.log(err)
            helper.sendErr(res, 400, err);
          });
    }

};