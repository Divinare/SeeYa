//var React = require('react/addons');

var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Route = Router.Route
    , Link = Router.Link;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            rightContainerReady: false
        };
    },

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

    // onClick={UTILS.messageComponent.showMessageComponent("Test message")}

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
                            <li className="navbar-desktop-element"><Link to="/eventForm">New event</Link></li>
                        </div>

                        { !this.props.loginStatusPending ? 
                            <div className="navbar-right-container">
                                { (this.props.user !== null) ? 
                                    <div className="navbarCommonElement">
                                        <li id="navbarUsername"><Link to="/settings">{this.props.user.username}</Link></li> 
                                        <li className="navbar-desktop-element"><Link to="/logout">Log out</Link></li>
                                    </div>
                                    :
                                     <div>
                                        <li className="navbar-desktop-element"><Link to="/signup">Sign up</Link></li>
                                        <li className="navbar-desktop-element"><Link to="/login">Log in</Link></li>
                                    </div>
                                }
                                <li className="navbarToggleMobile" onClick={this.openNavbar}></li>
                            </div> :
                            ''
                        }
                    </ul>
                </div>
                {/* WHITE NAVBAR SELECT WINDOW */}
                <div id="navbar-mobile" className="hidden">

                    <ul className="menu-mobile">
                            
                          <li> <Link to="/" onClick={this.closeNavbar}><div id="logomarker"></div></Link></li>
                         
                        <li onClick={this.closeNavbar}><Link to="/"><strong>SeeYa</strong></Link></li>

                        
                        <li><Link to="/about" onClick={this.closeNavbar}>About</Link></li>
                        <li><Link to="/eventForm" onClick={this.closeNavbar}>New event</Link></li>


                        { (this.props.user !== null) ? 
                            <div>
                                <li><Link to="/logout">Log out</Link></li>
                            </div>
                            :
                            <div>
                                <li><Link to="/signup" onClick={this.closeNavbar}>Sign up</Link></li>
                                <li><Link to="/login" onClick={this.closeNavbar}>Log in</Link></li>     
                            </div>
                        }
                    </ul>
                    <div id="navbarClose" onClick={this.closeNavbar}></div>
                </div>
            </div>
        )
    }

});