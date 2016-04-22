"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
        type:DataTypes.STRING,
        allowNull: false,
        unique:false,
        validate: { len: { args: [3,30], msg: "Username must be 3-30 characters long"} } 
    },
    password: {
        type:DataTypes.STRING(512),
        allowNull: true
    },    
    email: {
        type:DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    salt: {
        type:DataTypes.STRING(512),
        allowNull: true
    },
    role: {
        type:DataTypes.STRING,
        defaultValue: "User",
        allowNull: false
    },
    accountValidated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    showNotifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    //authentication provider for social logins, e.g. facebook or google
    authProvider: {
        type: DataTypes.STRING,
        allowNull: true
    },
    authProvUserId: {
        type: DataTypes.STRING,
        allowNull: true
    }
  },{
        timestamps: true,
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Event,{
                    foreignKey: 'creator'
                });
                User.belongsToMany(models.Event, {
                    through: models.Attendance,
                    foreignKey: 'userId'
                });
                User.hasMany(models.Attendance, {
                    foreignKey: 'userId'
                });
                User.hasMany(models.EventQueue, {
                    foreignKey: 'userId'
                });
                User.hasMany(models.UserReport, {
                    foreignKey: 'userId'
                })

            }
        }
  });

  return User;
};