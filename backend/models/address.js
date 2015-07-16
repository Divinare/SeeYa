"use strict";

module.exports = function(sequelize, DataTypes) {
	var Address = sequelize.define("Address", {
    streetAddress: { type: DataTypes.STRING, allowNull: false, validate: { len: { args: [3,30], msg: "Name must be at least 3-30 characters long"} } },

    country: { type: DataTypes.STRING, allowNull: false },
    zipCode: { type: DataTypes.STRING, allowNull: false }
    

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