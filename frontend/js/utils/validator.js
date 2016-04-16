var validator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');

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

        console.log("AT VALIDATE FIELD");
       // console.log(func);
        console.log(params);

        // Func is for example: validator.validateField(validator.validateEmail, ...);
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
                this.setErrorToField(inputField, errorArr, errorField);
            return false;
        } else {
            this.clearErrorFromField(inputField, errorField);
            return true;
        }
    },

    setErrorToField: function(inputField, errorArray, errorField){
        $(inputField).addClass('invalid')
        var errorText = errorArray.join('<br/>')
        $(errorField).html(errorText);
    },

    clearErrorFromField: function(inputField, errorField){
        $(inputField).removeClass('invalid')
        $(errorField).text("");
    }
}