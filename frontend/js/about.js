var React = require('react');

const About = React.createClass({


	getInitialState: function() {

		return {

		};

	},
	componentWillMount: function() {

	},

	componentDidMount: function() {
        this.props.handleResize();
	},


	render: function(){
		return (
			<div className='right-container'>
				<h1>About page comes here</h1>
			</div>
			)
	}

});

module.exports = About;