module.exports = {
    test: function() {
        return "hello world"
    },

    validateEmail: function(params){
        /*Validation regex taken from here: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        This just checks that the email is of form anystring@anystring.anystring, there are more complex validations
        we could do, but this should be enough for now.
        */
        var re = /\S+@\S+\.\S+/;
        var email = params["email"]
        return re.test(email);
    },

    validatePassword: function(params){
        var password = params["password"];
        var repeatPassword = params["repeatPassword"];
        if(module.exports.notEmpty({"value": password}) && password === repeatPassword ){
            return true
        }else{
            return false
        }
    },

    notEmpty: function(params){
        var value = params['value'];
        console.log("value: " + value)
        if( typeof value !== 'undefined' && value !== '' ){
            console.log("not empty")
            return true;
        }
        return false;
    }
}