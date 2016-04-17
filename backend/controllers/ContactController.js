var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize');
var Contact = models.Contact;
var helper = require("../helpers/helper.js");
var userService = require('../services/UserService.js');

module.exports = {

    create: function (req, res) {
        var success = function(user) {
            createCategory(req, res, user);
        }
        var error = function(err){
            createCategory(req, res, null);
        }
        userService.getLoggedInUser(req, res, success, error);
    }
};


function createCategory(req, res, user) {
    var contactToAdd = req.body;
    var userId = null;
    if(user != null) {
        userId = user.id;
    }
    Contact.create({
        subjectId: contactToAdd.subjectId,
        userId: userId,
        email: contactToAdd.email,
        description: contactToAdd.description
    }).then(function(contact){
        res.send(contact)
    }).catch(function(err){
        helper.sendErr(res, 400, err);
    });
}