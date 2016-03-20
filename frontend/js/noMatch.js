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
			<div className='right-container'>
				<h1>The page you were looking for does not exist!</h1>
			</div>
			)
	}

});

module.exports = NoMatch;