var utils = require('../utils.js');

const errors = {
    emptyString: "Field is empty",
    
    userEmailFormat: "Wrong format. Email address in form 'abc@cde.efg' expected",
    userEmailOrPasswordDontMatch: "Invalid email or password ",
    userPasswordsDontMatch: "Passwords don't match",

    eventName: "Name must be 3-30 characters long.",
    eventAddress: "Address incorrect. Did you select it from the list of address suggestions?",
    eventLatLng: "Coordinates for address doesn't exist. Put a marker on the map",
    eventDate: "Date error",
    eventCategory: "Category error",
    eventTime: "Time error",
    eventDescription: "Description can be max 500 characters long."
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