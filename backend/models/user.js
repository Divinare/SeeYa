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
    // do we trust the user, is he for example allowed to create events every ~20 second?
    trusted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    // has user verified his email by going to his email and by clicking verification link?
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    // unique string that is used for verifying account email
    emailVerificationId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    countOfSentVerificationEmails: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
    },
    // id string when user wants to reset his password, he goes to an url forgotPassword/:id and if id's match, he can reset his password
    forgotPasswordId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // when current forgotPasswordId was created
    forgotPasswordIdCreateTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    lastEventCreated: {
        type: DataTypes.DATE,
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