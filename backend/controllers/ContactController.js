var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize');
var Contact = models.Contact;
var helper = require("../helpers/helper.js");
var userService = require('../services/UserService.js');

module.exports = {

    create: function (req, res) {
        var contactToAdd = req.body;
        console.log("CONTACT TO ADD :");
        console.log(contactToAdd)

        Contact.create({
            subjectId: contactToAdd.subjectId,
            userId: 1, // TODO
            email: contactToAdd.email,
            description: contactToAdd.description
        }).then(function(contact){
            res.send(contact)
        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    }
};
