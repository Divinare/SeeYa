var React = require('react');
var $ = require('jquery');
var URL = require('../url.js');

var Navbar = require('./navbar.js');
var Map = require('./map.js');
var EventList = require('./event/eventList.js');
var EventForm = require('./event/eventForm.js')



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
		this.setState({
			showEventForm: !this.state.showEventForm
		})
	},


	render: function(){

		var eventForm = <EventForm />;
		var eventList = <EventList events={this.state.events} />;
		var bottomElement = this.state.showEventForm ? eventForm : eventList;

		return (
			<div>
				<Navbar toggleShowEventForm={this.toggleShowEventForm} showEventForm={this.state.showEventForm} />
				<Map />
				{bottomElement}
				
			</div>
			)
	}

});

module.exports = Index;