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