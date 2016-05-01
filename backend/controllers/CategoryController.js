var router = require("express").Router();
var models  = require('../models');
var Sequelize = require('sequelize');
var Category = models.Category;
var helper = require("../helpers/helper.js");

module.exports = {
    findOne: function (req, res) {
        var categoryId = req.params.id;
        Category.findOne({
            where: { id: categoryId }
        }).then(function (category) {
            res.send(category);
        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    },

    findByName: function (req, res) {
        var categoryName = req.params.name;
        Category.findOne({
            where: { name: categoryName }
        }).then(function (category) {
            res.send(category);
        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    },

    findAll: function (req, res) {
        Category.findAll().then(function (categories) {
        /*
          if (error) {
            res.status(500).send(error);
            return;
          }
          */
          res.send(categories);
      });
    },

    // TODO, prevent normal user from accessing this method
    /*
    create: function (req, res) {
        var categoryToAdd = req.body;
        console.log(categoryToAdd);

        Category.create({
            name: categoryToAdd.name
        }).then(function(category){
            res.send(category)
        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    },
    */

    // TODO, prevent normal user from accessing this method
    /*
    delete: function(req, res){
        var categoryId = req.params.id;
        models.Category.destroy({
            where: {
            id: categoryId
            }
        }).then(function(){
            res.status(200).send();
        }).catch(function(err){
            helper.sendErr(res, 400, err);
        });
    },
    */

    // TODO, prevent normal user from accessing this method
    /*
    update: function (req, res) {
        var categoryId = req.params.id;
        Registration.findOne({
            where: { id: categoryId}
        }).then(function( category ) {
            category.name = req.body['name'];
            category.save(function(err) {
                if (err) {
                    return res.send(err);
                }
                res.send(200);
            });
        });
    }
    */

};
