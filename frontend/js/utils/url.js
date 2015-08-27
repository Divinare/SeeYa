var environment = require('../../configs/environment.js');

var base = environment.base();
var REST = base + '/api';

module.exports = {
	'base': base,
	'REST': REST,
	'allEvents' : REST + '/events/',
	'event' : REST + '/events/',
	'attendance' : REST + '/attendances'
};