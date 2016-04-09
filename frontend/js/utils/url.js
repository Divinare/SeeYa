var REST = '/api';

module.exports = {
	'REST': REST,
	'allEntries': {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/',
		'category': REST + '/categories/'
	},
	'getFilteredEntries': {
		'filteredEvents': REST + '/filteredEvents/',
		'usersAttendingEvent': REST + '/users/eventAttendees/'
	},
	'getEntry' : {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/'
	},
	'addEntry': {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/',
		'user': REST + '/users/',
		'session': REST + '/sessions/'
	},
	'removeEntry': {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/'
	},
	'editEntry': {
		'event': REST + '/events/'
	},
	'authorization': {
		'loggedInStatus': REST + '/isLoggedIn',
		'logout': REST + '/logout'
	}
};