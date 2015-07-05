var React = require('react');
var $ = require('jquery');
var URL = require('../../url.js');

var Navbar = require('../navbar.js');

var Map = require('../map.js');
var Router = require('react-router-component');
var EventPage = React.createClass({


	getInitialState: function() {

		return {
			event: []
		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {
		var that = this;
		$.ajax({ 
			type: 'GET', 
			url: URL.base + 'event/12', 
			data: { get_param: 'name' }, 
			dataType: 'json',
			success: function (data) { 
				that.setState({
					event: data
				})
			}
		});

	},

	formatDate: function(dateStr){
		var dateObj = new Date(dateStr)
		var formatted = dateObj.getDate() + '.' + dateObj.getMonth() + 1 + '.' + dateObj.getFullYear();
		return formatted;
	},


	render: function(){

		var event = this.state.event
		return (

			<div>
				<Navbar toggleShowEventForm={this.toggleShowEventForm} showEventList={this.showEventList} showEventForm={this.state.showEventForm} />
			<Map />
			<h1>{event.name}</h1>
			Address: {event.address}<br/>
			Date: {this.formatDate(event.date)}<br/>
			Description: {event.description}
			</div>
			)
	}

});

module.exports = EventPage;