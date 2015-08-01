"use strict";

module.exports = function(sequelize, DataTypes) {
	var Attendance = sequelize.define("Attendance", {
    attendeeName: { type: DataTypes.STRING, allowNull: false, validate: { len: { args: [3,30], msg: "Name must be at least 3-30 characters long"} } },
    email: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.STRING },
  }, {
        timestamps: true,
        classMethods: {
        associate: function(models) {
          Attendance.belongsTo(models.Event);
      }
    }
  });

  return Attendance;
};