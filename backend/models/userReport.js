"use strict";

module.exports = function(sequelize, DataTypes) {
    var UserReport = sequelize.define("UserReport", {
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
                UserReport.belongsTo(models.User, {
                    foreignKey: 'userId'
                });
            }
        }
    });
  return UserReport;
};