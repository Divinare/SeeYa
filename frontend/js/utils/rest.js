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

var getEvent = function(url, onSuccess, onError) {
	$.ajax({ 
		type: 'GET', 
		url: url,
		dataType: 'json',
		success: onSuccess,
        error: onError
	});
}


module.exports = {

    getAllEvents: getAllEvents,
    getEvent: getEvent

}