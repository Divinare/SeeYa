var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;

const About = React.createClass({

	componentDidMount: function() {
		this.setToolbarIcons();
		this.props.handleResize();
	},

	setToolbarIcons: function() {
        var homeFunc = function() {
            browserHistory.push('/');
        }

        var toolbarComponentData = {
            "home": homeFunc
        }
        this.props.updateToolbarIcons(toolbarComponentData);
    },

	componentWillMount: function() {

	},

	render: function(){


	
		return (
			<div id="aboutContainer">
				<h2 className="topicText">Welcome! We are happy to See you!</h2>
				
				<p>SeeYa is a community for creating and joining events nearby. Discover new events, gain new experiences with other people and have fun.</p>
				<p>Simple and easy way to explore events near you or far away. SeeYa was developed in 2016 by a small group of friends in Helsinki, Finland.  </p>
				
			</div>
		)
	}

});

module.exports = About;