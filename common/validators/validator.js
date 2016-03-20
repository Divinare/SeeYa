var errorMessage = require('./errorMessage.js');
var utils = require('./utils.js');

module.exports = {

    validateEmail: function(email, message){
        /*Validation regex taken from here: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        This just checks that the email is of form anystring@anystring.anystring, there are more complex validations
        we could do, but this should be enough for now.
        */
        var re = /\S+@\S+\.\S+/;
        if( !re.test(email) ){
            return errorMessage.getError('emailFormat', message);
        }
        return '';
    },

    matchPasswords: function(params, message){
        var password = params["password"];
        var repeatPassword = params["repeatPassword"];
        if( utils.notEmpty(password) && password === repeatPassword ){
            return '';
        }
        return errorMessage.getError('passwordsDontMatch', message);
    },

    validateNotEmpty: function(value, message){
        if( utils.notEmpty(value) ) {
            return '';
        }
        return errorMessage.getError('', message);
    }
}