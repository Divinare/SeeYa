var React = require('react');
var URL = require('../url.js');
var utils = require('../utils.js');


var Map = require('../map.js');
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
		console.log("type: " + typeof event.address)
		if(typeof event.address !== 'undefined'){
			console.log(event.address)
			console.log(event.address[0])
			console.log(event.address.streetAddress)
			console.log(event.address['streetAddress'])
		}

		console.log("name: " + event.name)

		if(typeof event.address === 'undefined'){
			return (
				<div></div>
				)
		}
		return (		<div>
			<h1>{event.name}</h1>
			Address: {event.address.streetAddress}<br/>
			ZipCode: {event.address.ZipCode}<br/>
			Country: {event.address.country}<br/>
			Date: {utils.formatDate(event.date)}<br/>
			Description: {event.description}
			</div>
			)
	}

});

module.exports = EventPage;