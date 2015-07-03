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

		/*
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
*/
	},


	render: function(){
		return (
			<div>
				<Map />
				<h1>Event show page comes here</h1>

			</div>
			)
	}

});

module.exports = EventPage;