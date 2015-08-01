var React = require('react');

var utils = require('../utils.js');

var Map = require('../map.js');
var URL = require('../url.js')

var EventPage = React.createClass({


	getInitialState: function() {

		return {
			event: []
		};

	},
	componentWillMount: function() {
		console.log(URL.base + '/events/1'); // TODO: eventId
		var that = this;
		var tokens = utils.urlTokens();
		var eventId = tokens[tokens.length - 1];
		var url = URL.REST + '/events/' + eventId
		console.log("url: " + url) 

		$.ajax({ 
			type: 'GET', 
			url: url,
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
		//console.log("result: " + utils.urlTokens())

		var event = this.state.event
		console.log("event name: " + event.name)
		console.log(event)
		//console.log("type: " + typeof event.address)
		if(typeof event.address === 'undefined'){
			console.log("no address")
			return(
			<div>
				<h1>{event.name}</h1>
				Date: {event.timestamp}<br/>
				Description: {event.description}
			</div>
				)
		}

		return (
			<div>
				<h1>{event.name}</h1>
				Address: {event.address.streetAddress}<br/>
				ZipCode: {event.address.ZipCode}<br/>
				Country: {event.address.country}<br/>
				Date: {event.timestamp}<br/>
				Description: {event.description}
			</div>
			)
	}

});

module.exports = EventPage;