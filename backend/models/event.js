"use strict";

module.exports = function(sequelize, DataTypes) {
	var Event = sequelize.define("Event", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: { args: [3,30], msg: "Name must be at least 3-30 characters long"} }
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
            validate: { len: { args: [0,500]}}
        },
        lon: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: { min: -180, max: 180 }
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: { min: -90, max: 90 }
        },
        timestamp: {
            type : DataTypes.BIGINT,
            allowNull: false
        },
        maxAttendees: {
            type : DataTypes.INTEGER,
            allowNull: true
        }
  }, {
        timestamps: true,
        classMethods: {
            associate: function(models) {
                Event.belongsTo(models.User, {
                    foreignKey: 'creator'
                });
                Event.belongsToMany(models.User, {
                    through: models.Attendance,
                    foreignKey: 'eventId'
                });
                Event.belongsTo(models.Address);
                Event.belongsTo(models.Category);
                Event.hasMany(models.Attendance, {
                    foreignKey: 'eventId'
                })
                Event.hasMany(models.EventReport, {
                    foreignKey: 'eventId'
                })
                Event.hasMany(models.EventQueue, {
                    foreignKey: 'eventId'
                })
            }
        }
    });
  return Event;
};