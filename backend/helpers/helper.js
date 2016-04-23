var utils = require("../../common/utils.js")

module.exports = {
    //This and sendErrorsIfFound are used nowadays. We can delete the rest if we are sure they are not used anywhere anymore
    //The errorHash should have key value pairs where key is the name of the incorrect field and value is list of error messages related to that field
    sendError: function(res, statusCode, errorHash){
        var jsonResponse = {"errors" : errorHash};
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
                            errorsToBeSendToClient.push(validationErrors[property]);
                        }
                    }
                } else if( validationErrors[property].length > 0 ){
                    errorCount++;
                    errorsToBeSendToClient.push(validationErrors[property]);
                }
            }
        }
        if( errorCount > 0 ){
            console.log("errors found, seding to client")
            module.exports.sendError(res, 400, errorsToBeSendToClient);
            return true;
        }else{
            console.log("no errors")
        }
        return false;
    },

    //Gets a list of users with username like 'Anonymous%'
    //Parses the usernames to find the first free id (e.g. for users Anonymous1 and Anonymous4, id 2 would be returned)
    generateNextId: function(users){
        console.log("generating anonymous id")
        if( users == null) {
            return 1;
        }

        var ids = [];
        for( var i = 0; i < users.length; i++){
            var ending = users[i].get('username').replace('Anonymous','');
            var endingAsInt = parseInt(ending);
            if(!isNaN(endingAsInt)){
                ids.push(endingAsInt)
            }
        }
        if(ids.length === 0){
            return 1;
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
    }
};