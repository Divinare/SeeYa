var Moment = require('moment');


module.exports = {

	/* Returns the property from event object
	   Example input: event, address
	   Returns: Address object of event
	*/
	getValue: function(event, property) {
		// Handle special cases
		if(property == 'address') {
			return event['Address'];
		} else if (property == 'streetAddress') {
			return event['Address'].streetAddress;
		} else if(property == 'attendances') {
			return "" + event['Attendances'].length;
		} else if(property == 'timestamp') {
			return parseInt(event[property]);
			/*var unixTimestamp = event['timestamp'];
			var date = Moment.unix(unixTimestamp/1000).format("DD.MM.YYYY");
			var time = Moment.unix(unixTimestamp/1000).format("HH:mm")
			return time + ' ' + date;
			*/
		} else {
			return event[property];
		}
	},

	getTableHeader: function(tableContentName) {
		if(tableContentName == 'name') {
			return 'name';
		} else if(tableContentName == 'attendances') {
			return 'attendances';
		} else if(tableContentName == 'streetAddress') {
			return 'address';
		} else if(tableContentName == 'timestamp') {
			return 'time';
		} else {
			return 'table header not specified';
		}
	}

}