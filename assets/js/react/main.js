var React = require('react');
var $ = require('jquery');
var URL = require('../url.js');

var Map = require('./map.js');
var EventList = require('./eventList.js');









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
			EventMeetup
			<Map />
			<EventList events={this.state.events} />
			</div>
			)
	}

});

module.exports = Main;