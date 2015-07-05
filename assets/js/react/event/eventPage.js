var React = require('react');
var $ = require('jquery');
var URL = require('../../url.js');

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
			url: URL.REST + '/event/12/',
			dataType: 'json',
			success: function (data) { 
				that.setState({
					event: data
				})
			}
		});

	},

	/*
				<Map />
			<h1>{event.name}</h1>
			Address: {event.address}<br/>
			Date: {event.date}<br/>
			Description: {event.description}

			*/


	render: function(){

		var event = this.state.event
		return (

			<div>
			<h1>Moro</h1>
			<Map />
			<h1>{event.name}</h1>
			Address: {event.address}<br/>
			Date: {event.date}<br/>
			Description: {event.description}
			</div>
			)
	}

});

module.exports = EventPage;