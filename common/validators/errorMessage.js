var utils = require('./utils.js');

const errors = {
    emailFormat: "Wrong format. Email address in form 'abc@cde.efg' expected",
    emptyString: "Field is empty",
    passwordsDontMatch: "Passwords don't match"
}

module.exports = {
    getError: function(errorName, suppliedErrorMsg) {
        if( utils.notEmpty(suppliedErrorMsg) ){
            return suppliedErrorMsg;
        }
        if( utils.notEmpty(errors[errorName]) ){
            return errors[errorName];
        }
        return '';
    }
}