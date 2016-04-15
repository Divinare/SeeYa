"use strict";

module.exports = function(sequelize, DataTypes) {
    var EventReport = sequelize.define("EventReport", {
        reporterUserId: {
            type : DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
  }, {
        timestamps: true,
        classMethods: {
            associate: function(models) {
                EventReport.belongsTo(models.Event, {
                    foreignKey: 'eventId',
                    onDelete: 'cascade'
                });
            }
        }
    });
  return EventReport;
};