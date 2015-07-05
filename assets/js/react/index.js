var React = require('react');
var $ = require('jquery');
var URL = require('../url.js');

var Navbar = require('./navbar.js');
var Map = require('./map.js');
var EventList = require('./event/eventList.js');
var EventForm = require('./event/eventForm.js')

var EventPage = require('./event/eventPage.js');
var About = require('./about.js');
var NoMatch = require('./noMatch.js');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;


var Index = React.createClass({


	getInitialState: function() {

		return {
			events: [],
			showEventForm: false
		};

	},
	componentWillMount: function() {
		var that = this;
		$.ajax({ 
			type: 'GET', 
			url: URL.base + 'events', 
			data: { get_param: 'name' }, 
			dataType: 'json',
			success: function (data) { 
				that.setState({
					events: data
				})
			}
		});
	},

	componentDidMount: function() {

	},

	toggleShowEventForm: function() {
		console.log("toggle");
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
			<div>
				<Navbar toggleShowEventForm={this.toggleShowEventForm} showEventList={this.showEventList} showEventForm={this.state.showEventForm} />
				<Map />

				<Locations>
					<Location path="/" handler={bottomElement} />
					<Location path="/event/:id" handler={EventPage} />
					<Location path="/about" handler={About} />
					<Location path="*" handler={NoMatch} />
				</Locations>

				
				
			</div>
			)
	}

});

module.exports = Index;