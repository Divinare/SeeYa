var React = require('react');
var $ = require('jquery');
var URL = require('../url.js');
var utils = require('../utils.js');

var Navbar = require('./navbar.js');
var Map = require('./map.js');
var EventList = require('./event/eventList.js');
var EventForm = require('./event/eventForm.js')

var EventPage = require('./event/eventPage.js');
var About = require('./about.js');
var NoMatch = require('./noMatch.js');
/*
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;
*/

var ReactBootstrap = require('react-bootstrap')
  , Nav = ReactBootstrap.Nav
  , ListGroup = ReactBootstrap.ListGroup;
 
var ReactRouterBootstrap = require('react-router-bootstrap')
  , NavItemLink = ReactRouterBootstrap.NavItemLink
  , ButtonLink = ReactRouterBootstrap.ButtonLink
  , ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;
 


var Index = React.createClass({


	getInitialState: function() {

		showEventForm = false;
		console.log(window.location.href);
	//	if(utils.getParam(1) {
	//		showEventForm = true;
	//	}

		return {
			events: [],
			showEventForm: showEventForm
		};

	},
	componentWillMount: function() {
		console.log("gettt");
		var that = this;
		$.ajax({ 
			type: 'GET', 
			url: URL.REST + '/events', 
			data: { get_param: 'name' }, 
			dataType: 'json',
			success: function (data) { 
				that.setState({
					events: data
				})
				console.log(data);
			}
		});

	},

	componentDidMount: function() {

	},

	toggleShowEventForm: function() {
		console.log("toggleee");
		this.setState({
			showEventForm: !this.state.showEventForm
		})
	},
	
	showEventList: function() {
		console.log("show event list");
		this.setState({
			showEventForm: false
		})
	},


	render: function(){


		var eventForm = <EventForm />;
		var eventList = <EventList events={this.state.events} />;
		var bottomElement = this.state.showEventForm ? eventForm : eventList;


		return (
			return (
			<div>
				<Navbar toggleShowEventForm={this.toggleShowEventForm} showEventList={this.showEventList} showEventForm={this.state.showEventForm} />
				<Map />

				<Locations>
					<Location path="/" handler={bottomElement} />
					<Location path="/event/new" handler={EventForm} />
					<Location path="/event/:id" handler={EventPage} />
					<Location path="/about" handler={About} />
					<NotFound handler={NoMatch} />
				</Locations>
				
			</div>
			)
			)


	}

});


var Destination = React.createClass({
  render: function() {
    return <div>You made it!</div>;
  }
});
 
var routes = (
  <Route handler={App} path="/">
    <Route name="destination" path="destination/:someparam" handler={Destination} />
  </Route>
);
 
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

module.exports = Index;
