"use strict";

module.exports = function(sequelize, DataTypes) {
	var Attendance = sequelize.define("Attendance", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sendEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
  }, {
        timestamps: true,
        classMethods: {
        associate: function(models) {
          Attendance.belongsTo(models.Event, {
            foreignKey: 'eventId',
            onDelete: 'cascade',
            unique: 'pkIndex'
          });
          Attendance.belongsTo(models.User,{
            onDelete: 'cascade',
            foreignKey: 'userId',
            unique: 'pkIndex'
          });
        }
    }
  }
  );

  return Attendance;
};