var router = require("express").Router();
var models  = require('../models');

module.exports = {
    getLoggedInUser: function(req, res, success, error){
        console.log("get logged in user");
        if( !req.seeyaSession.user ){
            console.log("error, user wasnt logged in");
            error({message: "user is not logged in"});
        }else{
            console.log("user was logged in, emaiL: " + req.seeyaSession.user.email);
            models.User.findOne({
                where: { email: req.seeyaSession.user.email }
            }).then(function (user) {
                success(user);
                return null;
            }).catch(function(err){
                error(err);
            });
        }
    }

};