var React = require('react');

const About = React.createClass({

	componentDidMount: function() {
		this.props.handleResize();
	},

	componentWillMount: function() {

	},

	show: function() {
		window.UTILS.helper.showMessageComponent("Event was created succesfully! More dsa dsadsa dsad sadsad asdsa dsadsad lines just to demo this component", -1, "success");
	},

	render: function(){


	
		return (
			<div id="aboutContainer">
				<h2 id="aboutTopic" onClick={this.show}>Welcome! We are happy to See you!</h2>
				
				<p>SeeYa is a community for creating and joining events nearby. Discover new events, gain new experiences with other people and have fun.</p>
				<p>Simple and easy way to explore events near you or far away. SeeYa was developed in 2016 by a small group of friends in Helsinki, Finland.  </p>
				
			</div>
		)
	}

});

module.exports = About;