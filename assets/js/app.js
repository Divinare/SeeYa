/*global sails*/
var io = require('./dependencies/sails.io.js')();
var React = require('react');

var Index = require('./react/index.js');
var EventPage = require('./react/event/eventPage.js');
var About = require('./react/about.js');
var NoMatch = require('./react/noMatch.js');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;


React.render((
	<Locations>
		<Location path="/" handler={Index} />
		<Location path="/event/:id" handler={EventPage} />
		<Location path="/about" handler={About} />
		<Location path="*" handler={NoMatch} />
	</Locations>
),document.body);

