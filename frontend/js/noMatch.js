var React = require('react');

var NoMatch = React.createClass({


	getInitialState: function() {

		return {

		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {

	},


	render: function(){
		console.log("at no match component");
		return (
			<div id="noMatchContainer">
				<h2>Unfortunately we couldn't find the page you're looking for.</h2>

				<br />

				 <div id="nomatchmarker" >  </div>

			</div>

			)
	}

});

module.exports = NoMatch;