var REST = '/api';

module.exports = {
	'REST': REST,
	'allEntries': {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/',
		'category': REST + '/categories/'
	},
	'getFilteredEntries': {
		'filteredEvents': REST + '/filteredEvents/'
	},
	'getEntry' : {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/'
	},
	'addEntry': {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/',
		'user': REST + '/users/'
	},
	'removeEntry': {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/'
	},
	'editEntry': {
		'event': REST + '/events/'
	}
};