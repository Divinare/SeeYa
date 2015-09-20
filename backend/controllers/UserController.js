var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize')
var helper = require("../helpers/helper.js")

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
};