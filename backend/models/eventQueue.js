"use strict";

module.exports = function(sequelize, DataTypes) {
    var EventQueue = sequelize.define("EventQueue", {
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
    }
  }, {
        timestamps: true,
        classMethods: {
        associate: function(models) {
          EventQueue.belongsTo(models.Event, {
            foreignKey: 'eventId',
            onDelete: 'cascade',
            unique: 'pkIndex'
          });
          EventQueue.belongsTo(models.User,{
            onDelete: 'cascade',
            foreignKey: 'userId',
            unique: 'pkIndex'
          });
        }
    }
  }
  );

  return EventQueue;
};