var base = 'http://localhost:1337';
var REST = base + '/api';

module.exports = {
	'base': base,
	'REST': REST,
	'allEvents' : REST + '/events',
	'event' : REST + '/events',
	'attendance' : REST + '/attendances'
};