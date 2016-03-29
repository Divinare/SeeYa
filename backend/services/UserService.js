var router = require("express").Router();
var models  = require('../models');

module.exports = {
    getLoggedInUser: function(req, res, success, error){
        if( !req.seeyaSession.user ){
            error({message: "user is not logged in"});
        }else{
            models.User.findOne({
                where: { email: req.seeyaSession.user.email }
            }).then(function (user) {
                success(user);
            }).catch(function(err){
                error(err);
            });
        }
    }
};