var React = require('react');

var Map = require('./map.js');
var $ = require('jquery');
var URL = require('../url.js');

var Main = React.createClass({


	getInitialState: function() {

		return {

		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {
		$.ajax({ 
			type: 'GET', 
			url: URL.base + 'event', 
			data: { get_param: 'name' }, 
			dataType: 'json',
			success: function (data) { 
				$.each(data, function(index, event) {
					console.log(event.name);

					//$('body').append($('<div>', {
				//		text: element.name
				//	}));
				});
			}
		});
	},


	render: function(){
		return (
			<span>
			Events
			<Map />
			</span>
			)
	}

});

module.exports = Main;