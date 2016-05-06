var validator = require('../../../common/validators/validator.js');
var commonUtils = require('../../../common/utils.js');

module.exports = {

    /**
        - Func: function that is called to validate the params 
        (probably some function from the validator.js in common/validators folder)
        - Params: The user input to be validated, e.g. event name
        - InputField: The id of the input field as a string prepended with a hashtag, e.g. '#username'
        - ErrorField: The id of the error element formatted similarly as the inputfield's id, e.g. '#usernameError'
        Usually the error field is an element right after the input field
        - Message: A custom message in case you want to show some other message than what is returned
        by the "func" parameter. You don't have to specify this parameter if the default error message is fine.

        - This function shows the error messages (either the one given in message parameter or the ones returned
        by "func") in the errorField element. It also adds a red border around the input field in case it is
        not valid.

        -Returns boolean signaling whether the input was valid or not
    **/
     validateField: function(func, params, inputField, errorField, message) {
        var error = func(params, message);
        if( error.length > 0 ) {
            this.setErrorToField(inputField, error, errorField);
            return false;
        } else {
            this.clearErrorFromField(inputField, errorField);
            return true;
        }
    },

    // error param is a String
    setErrorToField: function(inputField, error, errorField) {
        if(commonUtils.notEmpty(inputField) && commonUtils.notEmpty(error) && commonUtils.notEmpty(errorField)) {
            $(inputField).addClass('invalid')
            var errorsArray = error.split("|");
            var errorText = errorsArray.join("<br>");
            $(errorField).html(errorText);
        } else {
            console.log("___ Programmer! Your setErrorToField params were invalid");
        }
    },

    clearErrorFromField: function(inputField, errorField){
        if(commonUtils.notEmpty(inputField) && commonUtils.notEmpty(errorField)) {
            $(inputField).removeClass('invalid')
            $(errorField).text("");
        } else {
            console.log("___ Programmer! Your clearErrorFromField params were invalid");
        }
    }
}

