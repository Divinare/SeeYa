"use strict";

module.exports = function(sequelize, DataTypes) {
	var Event = sequelize.define("Event", {
    name: { type: DataTypes.STRING, allowNull: false, validate: { len: { args: [3,30], msg: "Name must be at least 3-30 characters long"} } },
    description: { type: DataTypes.STRING, allowNull: true },
    lon: { type: DataTypes.FLOAT, allowNull: false },
    lat: { type: DataTypes.FLOAT, allowNull: false },
    requiresRegistration: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    timestamp: {type : DataTypes.BIGINT, allowNull: false}
  }, {
        timestamps: true,
        classMethods: {
        associate: function(models) {
          Event.belongsTo(models.Address);
          Event.hasMany(models.Attendance, {
            foreignKey: 'EventId'
            
          });

      }
    }
  });

  return Event;
};



/*
var Database = require('../db/connection.js');




var Event = Database.sequelize.define('Event', {
      name: { type: Database.DataTypes.STRING, allowNull: false, validate: { len: { args: [3,30], msg: "Name must be at least 3-30 characters long"} } },
    description: { type: Database.DataTypes.STRING, allowNull: true },
    date: { type: Database.DataTypes.DATE, allowNull: false }

});

module.exports = Event;

*/