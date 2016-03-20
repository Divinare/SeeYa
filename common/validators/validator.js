var errorMessage = require('./errorMessage.js');
var utils = require('../utils.js');

/* Validations used in frontend & backend.
   Each method returns an error message if validation fails */

module.exports = {

    /*** USER ***/

    validateEmail: function(email, message){
        /*Validation regex taken from here: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        This just checks that the email is of form anystring@anystring.anystring, there are more complex validations
        we could do, but this should be enough for now.
        */
        var re = /\S+@\S+\.\S+/;
        if( !re.test(email) ){
            return errorMessage.getError('userEmailFormat', message);
        }
        return '';
    },

    matchPasswords: function(params, message){
        var password = params["password"];
        var repeatPassword = params["repeatPassword"];
        if( utils.notEmpty(password) && password === repeatPassword ){
            return '';
        }
        return errorMessage.getError('userPasswordsDontMatch', message);
    },

    validateNotEmpty: function(value, message){
        if( utils.notEmpty(value) ) {
            return '';
        }
        return errorMessage.getError('', message);
    },


    /*** EVENT ***/

    validateEventName: function(name, message){
        if(name.length < 3 || name.length > 30) {
            return errorMessage.getError("name", message);
        }
        return "";
    },
    validateEventAddress: function(address){
        console.log("at validateAddress");
        if(address == null || typeof address == "undefined") {
            return false;
        }
        console.log(address.streetAddress)
        console.log(address.country)
        console.log(address.zipCode)

        if(address.streetAddress == null || address.country == null || address.zipCode == null) {
            return false;
        }
        return true;
    },
    validateEventLatLng: function(latLng) {
        console.log("at validate LatLng");
        console.log(latLng);
        return true;
    },
    validateEventDate: function(date){
        console.log("at validate date");
        console.log(date);
        if(date == null || typeof date == "undefined") {
            return false;
        }
        return true;
    },
    validateEventCategory: function(category){
        if(category == null || typeof category == "undefined" || category.length == 0) {
            return false;
        }
        return true;
    },
    validateEventTime: function(time){
        console.log("at validate time");
        console.log(time);
        return true;

    },
    validateEventDescription: function(description){
        if(description == null || typeof description == "undefined" || description.length == 0) {
            return true;
        }
        if(description.length > 500) {
            return false;
        }
        return true;
    }
}