"use strict";

module.exports = function(sequelize, DataTypes) {
    var EventLanguage = sequelize.define("EventLanguage", {
        language: {
            type : DataTypes.STRING,
            allowNull: false
        }
  }, {
        classMethods: {
            associate: function(models) {
                EventLanguage.belongsTo(models.Event, {
                    foreignKey: 'eventId',
                    onDelete: 'cascade',
                    unique: 'pkIndex'
                });
                EventLanguage.belongsTo(models.Language, {
                    foreignKey: 'languageId',
                    onDelete: 'cascade',
                    unique: 'pkIndex'
                });
            }
        }
    });
  return EventLanguage;
};