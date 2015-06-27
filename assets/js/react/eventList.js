var React = require('react');

var $ = require('jquery');
var _ = require('lodash');

var EventList = React.createClass({


	getInitialState: function() {

		return {

		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {
	
	},




	render: function(){
		console.log("events: ");
		console.log(this.props.events);

		_.each(this.props.events, function(event) {
			console.log(event);
		});

		return (
			<div id="eventList">
			Events
			
			</div>
			)
	}

});

module.exports = EventList;

var ListItem = React.createClass({

render: function(){
	return (
		<li>list item</li>
		);
}

})