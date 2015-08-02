var React = require('react');
var utils = require('../utils.js');
var Map = require('../map.js');
var URL = require('../url.js');
var Moment = require('moment');
var Underscore = require('underscore.string')

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
		var tokens = utils.urlTokens();
		var eventId = tokens[tokens.length - 1];
		var url = URL.REST + '/events/' + eventId
		console.log("url: " + url) 

	/*	$.get(url, function(result){
			if(this.isMounted()){
				this.setState({
					event: result
				});
			}
		}.bind(this));*/

$.ajax({ 
	type: 'GET', 
	url: url,
	dataType: 'json',
	success: function (data) { 
		if(that.isMounted()){
			that.setState({
				event: data
			})
		}

	}
});

},

render: function(){
		//console.log("result: " + utils.urlTokens())

		var event = this.state.event
		var date = Moment.unix(event.timestamp/1000).format("ddd DD.MM.YYYY");
		var time = Moment.unix(event.timestamp/1000).format("HH:mm")
		console.log("timestamp: " + event.timestamp)
		console.log(event)
		console.log("milliseconds now: " + new Date().getTime())

		console.log("event name: " + event.name)
		console.log(event)
		console.log(event.Address)
		//console.log("type: " + typeof event.address)

		var address;
		

		if(typeof event.Address === 'undefined'){
			address = <div></div>
		}else{
			var addressStr = '';

			if(!Underscore.isBlank(event.Address.streetAddress)){
				addressStr = event.Address.streetAddress + ", "
			}
			if(!Underscore.isBlank(event.Address.zipCode)){
				addressStr += event.Address.zipCode + ", "
			}
			if(!Underscore.isBlank(event.Address.city)){
				addressStr += event.Address.city + ", "
			}
			if(!Underscore.isBlank(event.Address.country)){
				addressStr += event.Address.country
			}
			addressStr = Underscore.trim(addressStr, ", ")
		
			address = <div><b>Address:</b> {addressStr}</div>

			console.log('-----------------')
			console.log(address)

		}

		return (
			<div>
			<h1>{event.name}</h1>
			<b>Date:</b> {date}<br/>
			<b>Time:</b> {time}<br/>
			<b>Description:</b> {event.description}
			{address}

			</div>
			)
	}

});

module.exports = EventPage;