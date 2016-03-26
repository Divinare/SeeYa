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
        console.log("at validateAddress");
        console.log("at validateAddress");
        console.log("at validateAddress");
        console.log("at validateAddress");
        console.log(address.streetAddress)
        console.log(address.country)
        console.log(address.zipCode)

        if(address == null || typeof address == "undefined") {
            return failed("eventAddress", customMessage);
        }

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
        
        if(utils.isEmpty(unixTimestamp)) {
            return failed("eventDate", "Invalid date format, the correct format is DD.MM.YYYY");
        }
        if(isNaN(unixTimestamp)) {
            return failed("eventDate", "Invalid date format, the correct format is DD.MM.YYYY");
        }
        if(unixTimestamp <= 0) {
            return failed("eventDate", "Invalid date format, the correct format is DD.MM.YYYY");
        }
        var dateNow = new Date();
        var date = new Date(unixTimestamp);

        var dateIsTodayOrInTheFuture = false;
        if(date.getFullYear() >= dateNow.getFullYear()) {
            if(date.getMonth()+1 >= dateNow.getMonth()+1) {
                if(date.getDate() >= dateNow.getDate()) {
                    dateIsTodayOrInTheFuture = true;
                }
            }

        }
        if(dateIsTodayOrInTheFuture) {
            return "";
        } else {
            return failed("eventDate", "Date needs to be in the future (>=" + dateNow.getDate() + "." + (dateNow.getMonth()+1) + "." + dateNow.getFullYear() + ")");
        }
        return "";
    },
    validateEventCategory: function(category, customMessage) {
        if(utils.isEmpty(category)) {
            return failed("eventCategory", customMessage);
        }
        return "";
    },
    validateEventTime: function(params, customMessage) {
        var time = params[0];
        var dateTimestamp = params[1];

        if(utils.isEmpty(time)) {
            return failed("eventTime", customMessage);
        }

        // Validate syntax
        var timeRegex = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
        var validTimeFormat = timeRegex.test(time);
        if(!validTimeFormat) {
            return failed("eventTime", customMessage);
        }

        // Validate that if the date has the same day as now, time is valid
        // if it is in the future compared to timeNow
        var dateNow = new Date();
        var date = new Date(dateTimestamp);
        var theDateIsSameAsToday = false;
        if(date.getFullYear() == dateNow.getFullYear()) {
            if(date.getMonth()+1 == dateNow.getMonth()+1) {
                if(date.getDate() == dateNow.getDate()) {
                    theDateIsSameAsToday = true;
                }
            }
        }
        if(theDateIsSameAsToday) {
            var timeInFuture = false;
            var hoursNow = dateNow.getHours();
            var minutesNow = dateNow.getMinutes();

            var hours = parseInt(time.substring(0, 2))
            var minutes = parseInt(time.substring(3, 5))

            if(hours > hoursNow) {
                timeInFuture = true;
            } else if(hours == hoursNow) {
                if(minutes > minutesNow) {
                    timeInFuture = true;
                }
            }
            if(!timeInFuture) {
                return failed("eventTime", "Time needs to be in the future");
            }
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