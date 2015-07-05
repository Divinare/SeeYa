var React = require('react');
var $ = require('jquery');
var URL = require('../../url.js');
var utils = require('../../utils.js');


var Map = require('../map.js');
var Router = require('react-router-component');
var EventPage = React.createClass({


	getInitialState: function() {

		return {
			event: []
		};

	},
	componentWillMount: function() {
		var that = this;
		var tokens = utils.urlTokens();
		var eventId = tokens[tokens.length - 1]
		$.ajax({ 
			type: 'GET', 
			url: URL.REST + '/event/' + eventId,
			dataType: 'json',
			success: function (data) { 
				that.setState({
					event: data
				})
			}
		});
	},

	componentDidMount: function() {


	},

	render: function(){
		console.log("result: " + utils.urlTokens())

		var event = this.state.event
		console.log("name: " + event.name)
		return (

			<div>
			<h1>{event.name}</h1>
			Address: {event.address}<br/>
	
			Description: {event.description}
			</div>
			)
	}

});

module.exports = EventPage;