"use strict";

module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define("Contact", {
    subjectId: { type:DataTypes.INTEGER, allowNull: false, unique:false },
    userId: { type:DataTypes.INTEGER, allowNull: true, unique:false },
    email: { type:DataTypes.STRING, allowNull: true, unique:false, validate: { len: { args: [0,254], msg: "Email must be max 254 characters long"} } },
    description: { type:DataTypes.STRING, allowNull: false, unique:false, validate: { len: { args: [1,500], msg: "Description must be 1-500 characters long"} } },
  },{
        timestamps: true,
  });

  return Contact;
};