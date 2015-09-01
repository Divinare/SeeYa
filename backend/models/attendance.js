"use strict";

module.exports = function(sequelize, DataTypes) {
	var Attendance = sequelize.define("Attendance", {
    name: { type: DataTypes.STRING, allowNull: false, validate: { len: { args: [3,30], msg: "Name must be 3-30 characters long"} } },
    email: { type: DataTypes.STRING, allowNull: true },
    comment: { type: DataTypes.STRING },
    sendEmail: {type: DataTypes.BOOLEAN, defaultValue: false}
  }, {
        timestamps: true,
        classMethods: {
        associate: function(models) {
          Attendance.belongsTo(models.Event, {
            onDelete: 'cascade'
          });
      }
    }
  });

  return Attendance;
};