var React = require('react');

var ReactBootsrap = require('react-bootstrap');
var Navbar = ReactBootsrap.Navbar;
var CollapsibleNav = ReactBootsrap.CollapsibleNav;
var NavItem = ReactBootsrap.NavItem;
var DropdownButton = ReactBootsrap.DropdownButton;
var MenuItem = ReactBootsrap.MenuItem;
var Nav = ReactBootsrap.Nav;

module.exports = React.createClass({

	toggleShowEventForm: function() {
		this.props.toggleShowEventForm();
	},
/*
		  <Navbar brand='EventMeetup' toggleNavKey={0}>
		    <CollapsibleNav eventKey={0}>}
		      <Nav navbar>
		        <NavItem eventKey={1} href='/about'>About</NavItem>
		        <NavItem eventKey={2} href='/'>Create new event</NavItem>
		      </Nav>
		      <Nav navbar right>
		      	 <DropdownButton eventKey={3} title='Dropdown'>
		          <MenuItem eventKey='1'>Action</MenuItem>
		          <MenuItem eventKey='2'>Another action</MenuItem>
		          <MenuItem eventKey='3'>Something else here</MenuItem>
		          <MenuItem divider />
		          <MenuItem eventKey='4'>Separated link</MenuItem>
		        </DropdownButton>
		        <NavItem eventKey={1} href='#'>Register</NavItem>
		        <NavItem eventKey={2} href='#'>Sign in</NavItem>
		      </Nav>
		    </CollapsibleNav>
		  </Navbar>
		  */ // navbar navbar-default navbar-static-top
	render: function(){

		return (

		<nav role="navigation" className="navbar navbar-default">
		  <div className="container">
		    <div className="navbar-header">
		      <button className="navbar-toggle" type="button">
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
		    </div>
		    <div className="collapse navbar-collapse">
		      <ul className="nav navbar-nav">
		        <li><a href="item1">Item 1</a></li>
		        <li><a href="item2">Item 2</a></li>
		      </ul>
		      <ul className="nav navbar-nav navbar-right">
		        <li><a href="rightItem1">Right Item 1</a></li>
		        <li><a href="rightItem2">Rith Item 2</a></li>
		      </ul>
		    </div>
		  </div>
		</nav>

		)
	}

});