var React = require('react');
var $ = require('jquery');
var URL = require('../url.js');


var EventForm = React.createClass({


	getInitialState: function() {

		return {

		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {

	},


	render: function(){
		return (
			<div>
				<h1>Create new event</h1>
				<form onSubmit={this.handleSubmit} className="eventForm">
					<input type="text" value={this.state.name}></input>
				</form>
			</div>
			)
	}

});

module.exports = EventForm;