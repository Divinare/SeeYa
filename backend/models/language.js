"use strict";

module.exports = function(sequelize, DataTypes) {
    var Language = sequelize.define("Language", {
        language: {
            type : DataTypes.STRING,
            allowNull: false
        }
  }, {
        classMethods: {
            associate: function(models) {
                Language.belongsToMany(models.Event, {
                    through: models.EventLanguage,
                    foreignKey: 'languageId'
                });
            }
        }
    });
  return Language;
};