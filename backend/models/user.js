"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: { type:DataTypes.STRING, allowNull: false },
    password: { type:DataTypes.STRING, allowNull: false },
    email: { type:DataTypes.STRING, allowNull: false, unique: true}

  });

  return User;
};
