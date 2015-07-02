var React = require('react');
var $ = require('jquery');
var URL = require('../url.js');

var Map = require('./map.js');
var EventList = require('./event/eventList.js');
var EventForm = require('./event/eventForm.js')



var Main = React.createClass({


	getInitialState: function() {

		return {
			events: []
		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {
		var that = this;
		$.ajax({ 
			type: 'GET', 
			url: URL.base + 'events', 
			data: { get_param: 'name' }, 
			dataType: 'json',
			success: function (data) { 
				that.setState({
					events: data
				})

			//	$.each(data, function(index, event) {
			//		console.log(event.name);

					//$('body').append($('<div>', {
				//		text: element.name
				//	}));
			//	});
			}
		});
	},


	render: function(){
		return (
			<div>
				<h1>EventMeetup</h1>
				<Map />
				<EventList events={this.state.events} />
				<EventForm />
			</div>
			)
	}

});

module.exports = Main;