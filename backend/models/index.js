  "use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = "production"; //process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../../config/config.json')[env];
//var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};
var sequelize = null;

if (env == "production") {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.PRODUCTION_DB_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    })
  } else {
sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
  //var sequelize = new Sequelize('postgres://null:localhost:5432/dbname');

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
db.Sequelize = Sequelize;

module.exports = db;