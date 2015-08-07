var Moment = require('moment');


/* Returns the property from event object */
var getValue = function(event, property) {
	console.log("get value!");
	console.log(event);
	console.log(property);
	// Handle special cases
	if(property == 'address') {
		return event[Address]
	} else if (property == 'streetAddress') {
		return event['Address'].streetAddress;
	} else if(property == 'attendances') {
		return event['Attendances'].length;
	} else if(property == 'timestamp') {
		var unixTimestamp = event['timestamp'];
		var date = Moment.unix(unixTimestamp/1000).format("DD.MM.YYYY");
		var time = Moment.unix(unixTimestamp/1000).format("HH:mm")
		return time + ' ' + date;
	} else {
		return event[property];
	}
};

module.exports = {

	getValue: getValue
	
}