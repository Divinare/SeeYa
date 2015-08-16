var URL = require('./url');

var getAllEvents = function(onSuccess, onError) {
	$.ajax({ 
        type: 'GET', 
        url: URL.allEvents,
        dataType: 'json',
        success: onSuccess,
        error: onError
    });
}


module.exports = {

    getAllEvents: getAllEvents

}