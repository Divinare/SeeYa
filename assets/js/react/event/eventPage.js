var React = require('react');
var $ = require('jquery');
var URL = require('../../url.js');

var Map = require('../map.js');
var Router = require('react-router-component');
var EventPage = React.createClass({


	getInitialState: function() {

		return {

		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {

	},


	render: function(){

		var event = this.state.event
		return (

			<div>
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