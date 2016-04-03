var moment = require('moment');

var errorMessage = require('./errorMessage.js');
var utils = require('../utils.js');
var fieldLengths = require('./fieldLengths.js');


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
        var errorMessages = []
        if( !re.test(email) ){
            errorMessages.push(errorMessage.getError('userEmailFormat', customMessage));
        }
        if( email.length > fieldLengths.userEmailMax ){
            errorMessages.push(errorMessage.getError('userEmailTooLong', customMessage));
        }else if( email.length < fieldLengths.userEmailMin ){
            errorMessages.push(errorMessage.getError('userEmailTooShort', customMessage));
        }
        return errorMessages;
    },

    matchPasswords: function(params, customMessage){
        var password = params["password"];
        var repeatPassword = params["repeatPassword"];
        if( utils.notEmpty(password) && password === repeatPassword ){
            return '';
        }
        return failed("userPasswordsDontMatch", customMessage);
    },

    validatePassword: function(password, customMessage){
        var msg = '';
        if( utils.notEmpty(password) ){
            if( password.length > fieldLengths.userPasswordMax ){
                msg = errorMessage.getError('userPasswordTooLong', customMessage);
            }
            else if( password.length < fieldLengths.userPasswordMin ){
                var msg = errorMessage.getError('userPasswordTooShort', customMessage);
            }
        }else{
            msg = errorMessage.getError('userPasswordTooShort', customMessage);
        }
        return msg;

    },

    validateNotEmpty: function(value, customMessage){
        if( utils.notEmpty(value) ) {
            return '';
        }
        return failed("emptyString", customMessage);
    },

    /*** EVENT ***/

    validateEventName: function(name, customMessage) {
        if(name.length < fieldLengths.eventNameMin || name.length > fieldLengths.eventNameMax) {
            return failed("eventName", customMessage);
        }
        return "";
    },
    validateEventAddress: function(address, customMessage) {

        if(address == null || typeof address == "undefined") {
            return failed("eventAddress", customMessage);
        }

        if(utils.notEmpty(address.country)) {
            if(address.country.length > fieldLengths.eventAddressCountryMax) {
                return failed("eventAddress", "Country in the address can be max "  +  fieldLengths.eventAddressCountryMax + " letters");
            }
        }

        if(utils.notEmpty(address.zipCode)) {
            if(address.zipCode.length > fieldLengths.eventAddressCountryMax) {
                return failed("eventAddress", "ZipCode in the address can be max " + fieldLengths.eventAddressCountryMax + " letters");
            }
        }

        if(utils.isEmpty(address.streetAddress)) {
            return failed("eventAddress", customMessage);
        } else if(address.streetAddress.length < fieldLengths.eventAddressStreetAddressMin || address.streetAddress.length > fieldLengths.eventAddressStreetAddressMax) {
            var msg = "Address must be " + fieldLengths.eventAddressStreetAddressMin + "-" + fieldLengths.eventAddressStreetAddressMax + " characters long"
            return failed("eventAddress", msg);
        }
        return "";
    },
    validateEventLatLng: function(latLng, customMessage) {
        // TODO: LAT LNG VALIDATION, you shouldnt be able to send something like 123x,asd

        if(utils.isEmpty(latLng)) {
            return failed("eventLatLng", customMessage);
        }
        return "";
    },
    validateEventDate: function(unixTimestamp, customMessage) {
        if(utils.isEmpty(unixTimestamp)) {
            return failed("eventDate","");
        }
        if(isNaN(unixTimestamp)) {
            return failed("eventDateWrongFormat", "");
        }
        if(unixTimestamp <= 0) {
            return failed("eventDateWrongFormat", "");
        }
        var dateNow = new Date();
        var date = new Date(unixTimestamp);

        var dateIsTodayOrInTheFuture = false;
 
        if(date.getFullYear() > dateNow.getFullYear()) {
            dateIsTodayOrInTheFuture = true;
        } else if(date.getFullYear() == dateNow.getFullYear()) {
            if(date.getMonth() > dateNow.getMonth()) {
                dateIsTodayOrInTheFuture = true;
            }
            if(date.getMonth() == dateNow.getMonth()) {
                if(date.getDate() >= dateNow.getDate()) {
                    dateIsTodayOrInTheFuture = true;
                }
            }
        }

        var timeDiff = Math.abs(date.getTime() - dateNow.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if(dateIsTodayOrInTheFuture && diffDays < fieldLengths.eventMaxDaysInTheFuture) {
            return "";
        } else if(!dateIsTodayOrInTheFuture) {
            return failed("eventDate", "Date needs to to be in the future (<=" + dateNow.getDate() + "." + (dateNow.getMonth()+1) + "." + dateNow.getFullYear() + ").");
        } else {
            return failed("eventDateMaxLimit", "");
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
            return failed("eventTime", "");
        }

        // Validate syntax
        var timeRegex = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
        var validTimeFormat = timeRegex.test(time);
        if(!validTimeFormat) {
            return failed("eventTimeFormat", customMessage);
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
                return failed("eventTimeFuture", "");
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
    },

    validateEventTimestamp: function(timestamp, customMessage) {

        var timestampNow = Date.parse(new Date());

        if(timestamp > timestampNow) {
            return ""; 
        } else {
            return failed("eventTimestamp", customMessage);
        }
    },

     validateField: function(func, params, fields, errorFields, message) {
        var errorArr = func(params, message);

        if( errorArr.constructor !== Array ){   
            //the function we called only returned error message, not an array of messages
            //put the message into an array, so the rest of this function works correctly
            if(utils.notEmpty(errorArr)){
                var tempArr = [];
                tempArr.push(errorArr);
                errorArr = tempArr;
            }
        }

        // Validation failed
        if( errorArr.length > 0 ) {
            for(var i = 0; i < fields.length; i++){
                module.exports.setErrorToField(fields[i], errorArr, errorFields[i]);
            }
            return false;
        } else {
            for(var i = 0; i < fields.length; i++){
                module.exports.clearErrorFromField(fields[i], errorFields[i]);
            }
            return true;
        }
    },

    setErrorToField: function(inputField, errorArray, errorMessageField){
        $("#" + inputField).addClass('invalid')
        var errorText = errorArray.join('<br/>')
        $("#" + errorMessageField).html(errorText);
    },

    clearErrorFromField: function(inputField, errorMessageField){
        $("#" + inputField).removeClass('invalid')
        $("#" + errorMessageField).text("");
    }
}