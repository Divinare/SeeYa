module.exports = {
    //This is used nowadays. We can delete the rest if we are sure they are not used anywhere anymore
    //The list should have key value pairs where key is the name of the incorrect field and value is the error message
    sendError: function(res, statusCode, errorList){
        var jsonResponse = {"errors" : errorList};
        res.status(statusCode).send(jsonResponse);
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