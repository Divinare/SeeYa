var io = require('./dependencies/sails.io.js')();
var React = require('react');

var Main = require('./react/main.js');
var EventShow = require('./react/event/eventShow.js');
var About = require('./react/about.js');
var NoMatch = require('./react/noMatch.js');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;


React.render((
	<Locations>
		<Location path="/" handler={Main} />
		<Location path="/events/:id" handler={EventShow} />
		<Location path="/about" handler={About} />
		<Location path="*" handler={NoMatch} />
	</Locations>
),document.body);

