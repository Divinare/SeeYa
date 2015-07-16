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

	showEventList: function() {
		this.props.showEventList();
	},

	render: function(){
		var toggleEventFormLinkText = this.props.showEventForm ? 'Browse events' : 'Create new event';
		var toggleEventFormHref = this.props.showEventForm ? 'event/new' : '/';
		return (
			<Navbar brand='' href='/' toggleNavKey={0}>
			    <CollapsibleNav eventKey={0}>
				     <Nav navbar>
				  	    <NavItem eventKey={1} href='/' onClick={this.showEventList}>EventMeetup</NavItem>
				        <NavItem eventKey={2} href={toggleEventFormHref} onClick={this.toggleShowEventForm}>{toggleEventFormLinkText}</NavItem>
				    </Nav>
				      <Nav navbar right>
				      	 <DropdownButton eventKey={3} title='Dropdown'>
				          <MenuItem eventKey='1'>Action</MenuItem>
				          <MenuItem eventKey='2'>Another action</MenuItem>
				          <MenuItem eventKey='3'>Something else here</MenuItem>
				          <MenuItem divider />
				          <MenuItem eventKey='4'>Separated link</MenuItem>
				        </DropdownButton>
				        <NavItem eventKey={1} href='/about'>About</NavItem>
				    </Nav>
			    </CollapsibleNav>
		    </Navbar>

		)
	}

});

/*
Versio, joka sisältää signin ja register:

			<Navbar brand='' href='/' toggleNavKey={0}>
			    <CollapsibleNav eventKey={0}>
				     <Nav navbar>
				  	    <NavItem eventKey={1} href='/' onClick={this.showEventList}>EventMeetup</NavItem>
				        <NavItem eventKey={1} href='/about'>About</NavItem>
				        <NavItem eventKey={2} href={toggleEventFormHref} onClick={this.toggleShowEventForm}>{toggleEventFormLinkText}</NavItem>
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

*/