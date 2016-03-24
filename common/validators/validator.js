var moment = require('moment');


var errorMessage = require('./errorMessage.js');
var utils = require('../utils.js');


/* Validations used in both frontend & backend.
   Each method returns an error message if the validation fails */

function failed(eventName, customMessage) {
    return errorMessage.getError(eventName, customMessage);
}

module.exports = {

    /*** USER ***/

    validateEmail: function(email, customMessage){
        /*Validation regex taken from here: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        This just checks that the email is of form anystring@anystring.anystring, there are more complex validations
        we could do, but this should be enough for now.
        */
        var re = /\S+@\S+\.\S+/;
        if( !re.test(email) ){
            return failed("userEmailFormat", customMessage);
        }
        return '';
    },

    matchPasswords: function(params, customMessage){
        var password = params["password"];
        var repeatPassword = params["repeatPassword"];
        if( utils.notEmpty(password) && password === repeatPassword ){
            return '';
        }
        return failed("userPasswordsDontMatch", customMessage);
    },

    validateNotEmpty: function(value, customMessage){
        if( utils.notEmpty(value) ) {
            return '';
        }
        return failed("emptyString", customMessage);
    },


    /*** EVENT ***/

    validateEventName: function(name, customMessage) {
        console.log("At validate name! " + name.length);
        if(name.length < 3 || name.length > 30) {
            return failed("eventName", customMessage);
        }
        return "";
    },
    validateEventAddress: function(address, customMessage) {
        console.log("at validateAddress");
        if(address == null || typeof address == "undefined") {
            return failed("eventAddress", customMessage);
        }
        console.log(address.streetAddress)
        console.log(address.country)
        console.log(address.zipCode)

        if(utils.isEmpty(address.streetAddress) || utils.isEmpty(address.country) || utils.isEmpty(address.zipCode)) {
            return failed("eventAddress", customMessage);
        }
        return "";
    },
    validateEventLatLng: function(latLng, customMessage) {
        console.log("at validate LatLng");
        console.log(latLng);
        if(utils.isEmpty(latLng)) {
            return failed("eventLatLng", customMessage);
        }
        return "";
    },
    validateEventDate: function(unixTimestamp, customMessage) {
        console.log("at validate date");
                console.log("@@@@@@@@@@@@@@")
        console.log("@@@@@@@@@@@@@@")
        console.log("@@@@@@@@@@@@@@")
        console.log("@@@@@@@@@@@@@@")
        console.log("@@@@@@@@@@@@@@")
        console.log(unixTimestamp);
                console.log("@@@@@@@@@@@@@@")
        console.log("@@@@@@@@@@@@@@")
        console.log("@@@@@@@@@@@@@@")
        console.log("@@@@@@@@@@@@@@")
        console.log("@@@@@@@@@@@@@@")

        if(utils.isEmpty(unixTimestamp)) {
        console.log("1");

            return failed("eventDate", customMessage);
        }
        if(isNaN(unixTimestamp)) {
        console.log("2");
            return failed("eventDate", customMessage);

        }
        if(unixTimestamp <= 0) {
            return failed("eventDate", customMessage);
        }
        var maxAllowedYearsInFuture = 1;
        var minAllowedHours = 12;
        var minAllowed_unixTimestamp = 12*60*60;

        var dateNow_unixTimestamp = minAllowed_unixTimestamp + Date.parse(new Date())/1000;
        var maxAllowedDate_unixTimestamp = Date.parse(new Date(new Date().setYear(new Date().getFullYear() + maxAllowedYearsInFuture)))/1000;

        console.log(dateNow_unixTimestamp);
        console.log(unixTimestamp);
        console.log(maxAllowedDate_unixTimestamp);

        if(dateNow_unixTimestamp > unixTimestamp && maxAllowedDate_unixTimestamp < unixTimestamp) {
            console.log("OK :)");
            return "";
        } else {
            console.log("4 FAILL");
            return failed("eventDate", customMessage);
        }




        console.log("3");

        //if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
        //    return failed("eventDate", customMessage);
        //}
        return "";
    },
    validateEventCategory: function(category, customMessage) {
        console.log("At category validate, " + category);
        if(utils.isEmpty(category)) {
            return failed("eventCategory", customMessage);
        }
        console.log("did not fail!");
        return "";
    },
    validateEventTime: function(time, customMessage) {
        console.log("at validate time");
        console.log(time);
        if(utils.isEmpty(time)) {
            return failed("eventTime", customMessage);
        }
        return "";

    },
    validateEventDescription: function(description, customMessage) {
        if(utils.isEmpty(description)) {
            return "";
        }
        if(description.length > 500) {
            return failed("eventDescription", customMessage);
        }
        return "";
    }
}