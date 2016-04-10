var validator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');

module.exports = {

     validateField: function(func, params, inputField, errorField, message) {

        console.log("AT VALIDATE FIELD");
        console.log(func);
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