var utils = require('../utils.js');

var fieldLengths = require('./fieldLengths.js');


const errors = {
    emptyString: "Field is empty",
    
    userUsernameEmpty: "Username cannot be empty. It must be 3-30 characters long.",
    userUsernameTooShort: "Username must be at least " + fieldLengths.userUsernameMin + " characters long.",
    userUsernameTooLong: "Username can be max " + fieldLengths.userUsernameMax + " characters long.",
    userUsernameAlreadyInUse: "Username already in use, you can leave the field empty and change it later in settings.",
    userEmailFormat: "Wrong format. Email address in form 'abc@cde.efg' expected",
    userEmailTooLong: "Email too long",
    userEmailTooShort: "Email too short",
    userEmailOrPasswordDontMatch: "Invalid email or password combination",
    userEmailAlreadyInUse: 'Email already in use',
    userPasswordsDontMatch: "Passwords don't match",
    userPasswordTooLong: "Password too long",
    userPasswordTooShort: "Password too short",
    userNotAuthorized: "This feature is only available for logged in users. Please sign up, or login",
    userOldPasswordMissMatch: "Old password was incorrect",
    userNonVerifiedAccountFbLoginStart: "There's an existing user account with ",
    userNonVerifiedAccountFbLoginEnd: "Please verify the email address before logging in with Facebook",

    eventName: "Name must be 3-30 characters long.",
    eventAddress: "Address incorrect. Did you select it from the list of address suggestions?",
    eventLatLng: "Coordinates for address doesn't exist. Put a marker on the map.",
    eventDate: "Date cannot be left empty.",
    eventDateWrongFormat: "Wrong date format. The correct one is DD:MM:YYYY, for example 25.06.2016.",
    eventDateWrongFormat: "Wrong date format. The correct one is DD:MM:YYYY, for example 25.06.2016.",
    eventDateMaxLimit: "Date can be max one year in the future.",

    eventCategory: "Category error",
    eventTime: "Time cannot be left empty",
    eventTimeFormat: "Wrong time format. The correct one is hh:mm, for example 17:30",
    eventTimeFuture: "Time needs to be in the future",
    eventDescription: "Description can be max 500 characters long",
    eventTimestamp: "Timestamp must be in the future",

    contactSubjectIdEmpty: "Suject cannot be empty. Please select one from the list.",
    contactWrongSubjectId: "Subject id must be either 1, 2 or 3.",
    contactEmailFormat: "Wrong format. Email address in form 'abc@cde.efg' expected.",
    contactEmailTooShort: "Email is too short.",
    contactEmailTooLong: "Email too long.",
    contactDescriptionEmpty: "Description cannot be left empty.",
    contactDescriptionTooLong: "Description can be max " + fieldLengths.contactDescriptionMaxLength + " long.",
    contactDescriptionTooShort: "Description must be at least 1 character long.",

    attendanceCommentTooLong: "The comment can be max " + fieldLengths.attendanceCommentMax + " long."
}

module.exports = {
    getError: function(errorName, customMessage) {
        if( utils.notEmpty(customMessage) ){
            return customMessage;
        }
        if( utils.notEmpty(errors[errorName]) ){
            return errors[errorName];
        }
        if (utils.isEmpty(errors[errorName])) {
            console.log("***********")
            console.log("Programmer! Your error from errors[errorName] did not found, fix this");
            console.log("***********")
        }
        // Should't happen
        return '';
    }
}