//var React = require('react/addons');

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route
    , Link = Router.Link;

module.exports = React.createClass({

	toggleShowEventForm: function() {
		this.props.toggleShowEventForm();
	},

	showEventList: function() {
		this.props.showEventList();
	},

    createNavbarMenu: function() {

    },

    render: function(){

        return (
            <div id="navbar">
                <ul id="navbar-menu">
                    <div className="navbar-left-container">
                        <li id="navbar-logo"><Link to="/"><strong>EventMeetup</strong></Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/eventForm">Create new event</Link></li>
                    </div>
                    <div className="navbar-right-container">
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </div>
                </ul>
                <div id="navbar-toggle-mobile">X</div>
            </div>


        )
    }

});