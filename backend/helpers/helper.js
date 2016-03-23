module.exports = {
	sendErr: function(res, statusCode, err){
        res.status(statusCode).send(err.message);
    },
    sendErrJsonObj: function(res, statusCode, err){
        res.status(statusCode).send(err);
    }
};