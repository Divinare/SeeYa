module.exports = {
    //This is used nowadays. We can delete the rest if we are sure they are not used anywhere anymore
    //The errorHash should have key value pairs where key is the name of the incorrect field and value is list of error messages related to that field
    sendError: function(res, statusCode, errorHash){
        var jsonResponse = {"errors" : errorHash};
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