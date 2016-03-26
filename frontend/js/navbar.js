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

    openNavbar: function() {
        $("#navbar-mobile").removeClass("hidden");
    },

    closeNavbar: function() {
        $("#navbar-mobile").addClass("hidden");
    },

    render: function(){
        return (
            <div id="navbarContent">
                <div id="navbar">
                    <ul id="navbar-menu">
                        <div className="navbar-left-container">
                            <span id="navbarLogoContainer">
                                <div id="navbar-logo"><Link to="/"></Link></div>
                            </span>
                            <li className="navbar-desktop-element"><Link to="/about">About</Link></li>
                            <li className="navbar-desktop-element"><Link to="/eventForm">Create new event</Link></li>
                        </div>

                        <div className="navbar-right-container">
                            <li className="navbar-desktop-element"><Link to="/signup">Signup</Link></li>
                            <li className="navbar-desktop-element"><Link to="/login">Login</Link></li>
                            { this.props.loggedIn ? 
                            <li className="navbar-desktop-element">{this.props.username}</li> :
                            <li className="navbar-desktop-element" onClick={this.openNavbar}></li> }
                            <li className="navbar-toggle-mobile" onClick={this.openNavbar}>X</li>
                            

                        </div>
                    </ul>
                </div>
                <div id="navbar-mobile" className="hidden">
                    <ul className="menu-mobile">
                        <li id="navbar-logo" onClick={this.closeNavbar}><Link to="/"><strong>SeeYa</strong></Link></li>
                        <li><Link to="/about" onClick={this.closeNavbar}>About</Link></li>
                        <li><Link to="/eventForm" onClick={this.closeNavbar}>Create new event</Link></li>
                        <li><Link to="/signup" onClick={this.closeNavbar}>Signup</Link></li>
                        <li><Link to="/login" onClick={this.closeNavbar}>Login</Link></li>                        
                    </ul>
                    <div id="navbar-close" onClick={this.closeNavbar}>X</div>
                </div>
            </div>
        )
    }

});