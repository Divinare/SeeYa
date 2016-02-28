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

    render: function(){

        return (
            <div id="navbar">
                <ul>
                    <li className="navbar-item"><Link to="/">EventMeetup</Link></li>
                    <li className="navbar-item"><Link to="/about">About</Link></li>
                    <li className="navbar-item"><Link to="/eventForm">Create new event</Link></li>
                    <li className="navbar-item"><Link to="/signup">Signup</Link></li>
                    <li className="navbar-item"><Link to="/login">Login</Link></li>
                </ul>
            </div>
        )
    }

});


/*
	render: function(){
		var toggleEventFormLinkText = this.props.showEventForm ? 'Browse events' : 'Create new event';
		var toggleEventFormHref = this.props.showEventForm ? 'event/new' : '/';
        var Brand = <NavItemLink to='home' className='nav navbar-nav app-name-navbar'><span id="home">EventMeetup</span></NavItemLink>;

        return (
           <Navbar brand={Brand} toggleNavKey={0}>
               <CollapsibleNav eventKey={0}>
                   <Nav navbar>
                        <NavItemLink
                          to="about">
                          About
                        </NavItemLink>
                        <NavItemLink
                          to="eventForm">
                          Create new event
                        </NavItemLink>
                    </Nav>
                </CollapsibleNav>
            </Navbar>
    		)
	}

});

*/

/*


      <div>
        NavItemLink<br />
        <Nav>
          <NavItemLink
            to="home"
            params={{ someparam: 'hello' }}>
            Linky!
          </NavItemLink>
        </Nav>
        <br />
        ButtonLink<br />
        <ButtonLink
          to="about"
          params={{ someparam: 'hello' }}>
          Linky!
        </ButtonLink>
        <br />
        <ListGroup>
          <ListGroupItemLink
            to="eventForm"
            params={{ someparam: 'hello' }}>
            Linky!
          </ListGroupItemLink>
        </ListGroup>
        <RouteHandler />
      </div>












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


var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({

  render: function() {
    return <div className="ui pointing menu">
      <div className="ui page grid">
        <div className="column" style={{"padding-bottom": 0}}>
          <div className="title item">
            <b>Application Name</b>
          </div>
          <Link className="item" to="home">
            Home
          </Link>
          <Link className="item" to="about">
            About
          </Link>
          <Link className="item" to="eventForm">
            Create new event
          </Link>

          <div className="right floated item">
            <i className="setting icon"/>
          </div>
          <div className="right floated item">
            <div className="ui teal button">Sign Up</div>
          </div>
          <div className="right floated item">
            <div className="ui button">Log in</div>
          </div>
        </div>
      </div>
    </div>
  }
});

module.exports = Header;


*/