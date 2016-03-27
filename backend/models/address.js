"use strict";

module.exports = function(sequelize, DataTypes) {
	var Address = sequelize.define("Address", {
    streetAddress: { type: DataTypes.STRING, allowNull: false, validate: { len: { args: [5,50], msg: "Address must be at least 5-50 characters long"} } },
    country: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true},
    zipCode: { type: DataTypes.STRING, allowNull: true }
  }, {
        timestamps: true,
        classMethods: {
        associate: function(models) {
          Address.hasMany(models.Event);
      }
    }
  });

  return Address;
};