module.exports = {

    validateEmail: function(params) {
        var re = /\S+@\S+\.\S+/;
        var email = params["email"]
        return re.test(email);
    },

    test: function() {
        return "hello world"
    }
}