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

	componentDidMount: function() {


	},

	formatDate: function(dateStr){
		var dateObj = new Date(dateStr)
		var formatted = dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear();
		return formatted;
	},
		

	render: function(){
		console.log("href: " + window.location.href)
		var event = this.state.event
		return (

			<div>
			<h1>{event.name}</h1>
			Address: {event.streetAddress}<br/>
			Date: {this.formatDate(event.date)}<br/>
			Description: {event.description}
			</div>
			)
	}

});

module.exports = EventPage;