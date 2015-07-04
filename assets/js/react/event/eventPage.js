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
		var that = this;
		$.ajax({ 
			type: 'GET', 
			url: URL.base + 'event/1', 
			data: { get_param: 'name' }, 
			dataType: 'json',
			success: function (data) { 
				that.setState({
					event: data
				})
			}
		});

	},


	render: function(){

		//var event = this.state.event
		return (

			<div>
			<h1>Moro</h1>
		/*	<Map />
			<h1>{event.name}</h1>
			Address: {event.address}<br/>
			Date: {event.date}<br/>
			Description: {event.description}*/
			</div>
			)
	}

});

module.exports = EventPage;