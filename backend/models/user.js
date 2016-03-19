"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: { type:DataTypes.STRING, allowNull: false, unique:true },
    password: { type:DataTypes.STRING(260), allowNull: false },
    email: { type:DataTypes.STRING, allowNull: false, unique: true},
    salt: { type:DataTypes.STRING(260), allowNull: false}

  });

  return User;
};
