var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

const About = React.createClass({

	componentDidMount: function() {
		this.props.handleResize();
	},

	componentWillMount: function() {

	},

	show: function() {
		window.UTILS.helper.showMessageComponent("Event was created succesfully!", 3000, "error");
	},

	render: function(){
	

		return (
			<div>
				<Link to={"/"}><img className="imghomeicon" src="assets/resizedImageStash/back_to_home_dark_icon.png" alt="Back to home" /></Link>
				<br />
				<br />
				<br />
				<br />
				<h1>Welcome! We are happy to See you!</h1>
				<br />
				<br />
				<p>SeeYa is a community for creating and joining events nearby. Discover new events, gain new experiences with other people and have fun.</p>
				<p>Simply and easy way to explore events near you or far away. SeeYa was developed in 2016 by a small group of friends in Helsinki, Finland.  </p>
				<br />
				<br />
				<img className="markerbig" src="assets/imageStash/marker_gatherup.png" alt="See Ya Marker" />
			</div>
		)
	}

});

module.exports = About;