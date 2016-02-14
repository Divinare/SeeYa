var models  = require('../models');
var Sequelize = require('sequelize');
var Category = models.Category;
var helper = require("../helpers/helper.js");

var Promise = require('bluebird');

module.exports = {

    findByName: function (categoryName) {
        return new Promise(function(resolve, reject) {

            models.Category.findOne({
                where: { name: categoryName }
            }).then(function (category) {
                resolve(category);
            }).catch(function(err) {
                reject(null);
            });

        });

    }

};