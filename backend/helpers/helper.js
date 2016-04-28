var utils = require("../../common/utils.js")

module.exports = {
    //This and sendErrorsIfFound are used nowadays. We can delete the rest if we are sure they are not used anywhere anymore
    //The errorHash should have key value pairs where key is the name of the incorrect field and value is list of error messages related to that field
    sendError: function(res, statusCode, errorHash){
        var jsonResponse = {"errors": errorHash};
        res.status(statusCode).send(jsonResponse);
    },

    /**Gets a hash of errors and corresponding field names. If any errors are found, they are sent back to the
        client.

        Returns true if errormessages were sent and false otherwise

        See usercontroller create method for example usage
    **/
    sendErrorsIfFound: function(res, validationErrors){
        var errorCount = 0;
        var errorsToBeSendToClient = [];

        for (var property in validationErrors) {
            console.log(property);
            console.log(validationErrors);
            if (validationErrors.hasOwnProperty(property)) {
                if(validationErrors[property].constructor == Array) {
                    console.log(validationErrors[property]);
                    for(errorArray in validationErrors[property]) {
                        if(errorArray.length > 0) {
                            console.log("ERROR!");
                            console.log(validationErrors[property]);
                            console.log(errorArray);
                            errorsToBeSendToClient.push(validationErrors[property]);
                            errorCount++;
                        }
                    }
                } else if( validationErrors[property].length > 0 ){
                    errorCount++;
                    errorsToBeSendToClient.push(validationErrors[property]);
                }
            }
        }
        if( errorCount > 0 ){
            console.log("errors found, sending to client")
            module.exports.sendError(res, 400, errorsToBeSendToClient);
            return true;
        }else{
            console.log("no errors")
        }
        return false;
    },


    /**Gets a hash of errors and corresponding field names. If any errors are found, they are sent back to the
    client.
    Returns true if errormessages were sent and false otherwise
    See usercontroller create method for example usage
    **/
    sendErrorsMappedToFields: function(res, validationErrors){
        var errorCount = 0;
        for (var property in validationErrors) {
            if (validationErrors.hasOwnProperty(property)) {
                if( validationErrors[property].length > 0 ){
                    errorCount++;
                }else{
                    delete validationErrors[property]
                }
            }
        }
        if( errorCount > 0 ){
            console.log("errors found, seding to client")
            module.exports.sendError(res, 400, validationErrors);
            return true;
        }else{
            console.log("no errors")
        }
        return false;
    },

    /**
    Can be used to create a unique username. Finds the next free ordinal number to add after the username
    so that the username will be unique. The username that needs to be made unique is given as the
    usernameBase parameter. Parameter users contains the users having a name that starts with the 
    usernameBase. If the usernameBase is unique in it itself, the '' is returned

    Example:
    We want to make a username 'Anonymous' unique. We first search the database for users whose username starts
    with 'Anonymous' and give the list to this method in the users parameter. The parameter usernameBase
    will be 'Anonymous' as it is the username we want to make unique. If the db has users 'Anonymous', 
    'Anonymous' and 'Anonymous', this method will return 3, as that is the next free ordinal number we can add
    after the usernameBase
    **/
    generateNextId: function(users, usernameBase){
        console.log("generating anonymous id")
        if( users == null) {
            return '';
        }

        var ids = [];
        for( var i = 0; i < users.length; i++){
            var ending = users[i].get('username').replace(usernameBase,'');
            var endingAsInt = parseInt(ending);
            if(!isNaN(endingAsInt)){
                ids.push(endingAsInt)
            }
        }
        if(ids.length === 0){
            return '';
        }
        ids.sort(module.exports.sortNumerically);

        for( var i= 0; i < ids.length; i++ ){
            var id = ids[i];
            if( i < ids.length && id + 1 !== ids[i + 1]){    //if id + 1 is not found in the id list we can use it
                return id + 1;
            }
        }
        return (ids[ids.length - 1] + 1)
    },

    //needed because javascript sort method treats the values as text by default
    sortNumerically: function(a, b){
        return a - b;
    },






    addErrorIfNotEmpty: function(array, errorMsg){
        if(utils.notEmpty(errorMsg)){
            array.push(errorMsg);
        }
    },

    addErrorsIfNotEmpty: function(array, errorArr){
        if(errorArr.length > 0){
            array = array.concat(errorArr);
        }
        return array;
    },






	sendErr: function(res, statusCode, err){
        res.status(statusCode).send(err.message);
    },
    sendErrJsonObj: function(res, statusCode, err){
        res.status(statusCode).send(err);
    },
    sendResponse: function(res, statusCode, jsonResponse){
        res.status(statusCode).send(jsonResponse);
    },


    makeId: function(length) {
        var id = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < length; i++ )
        id += possible.charAt(Math.floor(Math.random() * possible.length));

        return id;
    }
    
};