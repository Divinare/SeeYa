  "use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../../config/config.json')[env];
var db        = {};
var sequelize = null;

if (env == "production") {
    console.log("Production env: " + env);
    
    // the application is executed on Heroku ... uses postgres database
    sequelize = new Sequelize(process.env.PRODUCTION_DB_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        port:     5432,
        host:     'ec2-54-163-238-96.compute-1.amazonaws.com',
        logging:  true //false
    });
/*
CONFIGS WHEN DB WAS AT OUR OWN SERVER, DONT REMOVE:
    console.log("Production env: " + env);
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
  */
  } else {
    console.log("Development env: " + env);
    console.log("db: " + config.database)
    console.log("user: " + config.username)
    console.log("password: " + config.password)
    console.log("host: " + config.host)
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
}

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;