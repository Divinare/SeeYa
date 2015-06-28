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

		var table = document.createElement('table');
		var tr1 = document.createElement('tr');
		var tr2 = document.createElement('tr');
		var tableHeaders = ['Name', 'Description', 'Date'];

		tableHeaders.map(function(header) {
			var td = document.createElement('th');
			var text = document.createTextNode(header);
			td.appendChild(text);
			tr1.appendChild(td);

		});
		table.appendChild(tr1);

		this.props.events.map(function(event) {
			var listItem = <ListItem />
			console.log(listItem);
			table.appendChild(listItem);
		});
	//	table.appendChild(tr2);

		return (
			<div id="eventList">
			Events
			<table />

			</div>
			)
	}

});

module.exports = EventList;

var ListItem = React.createClass({

render: function(){
	return (
		<tr>
			<td>listitemiiii</td>
		</tr>
		);
}

})