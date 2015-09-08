var environment = require('../../configs/environment.js');

var base = environment.base();
var REST = base + '/api';

module.exports = {
	'base': base,
	'REST': REST,
	'allEntries': {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/'
	},
	'getEntry' : {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/'
	},
	'addEntry': {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/'
	},
	'removeEntry': {
		'event': REST + '/events/',
		'attendance': REST + '/attendances/'
	},
	'editEntry': {
		'event': REST + '/events/'
	}
};