window.$ = window.jQuery = require('jquery');

var React = require('react');

/*
var Router = require('react-router');
var Route = Router.Route
var RouteHandler = Router.RouteHandler
var DefaultRoute = Router.DefaultRoute
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
*/

var Header = require('./js/header.js');
var Map = require('./js/map.js');
var About = require('./js/about.js');
var NoMatch = require('./js/noMatch.js');
var EventList = require('./js/event/eventList.js');
var EventForm = require('./js/event/eventForm.js');
var EventPage = require('./js/event/eventPage.js');

var Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , History = Router.History;
/*
TOIMIVA ESIMERKKI REACT ROUTERISTA:

var ReactBootstrap = require('react-bootstrap')
  , Nav = ReactBootstrap.Nav
  , ListGroup = ReactBootstrap.ListGroup;

var ReactRouterBootstrap = require('react-router-bootstrap')
  , NavItemLink = ReactRouterBootstrap.NavItemLink
  , ButtonLink = ReactRouterBootstrap.ButtonLink
  , ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;

var App = React.createClass({
  render: function() {
    return (
      <div>
        NavItemLink<br />
        <Nav>
          <NavItemLink
            to="destination"
            params={{ someparam: 'hello' }}>
            Linky!
          </NavItemLink>
        </Nav>
        <br />
        ButtonLink<br />
        <ButtonLink
          to="destination"
          params={{ someparam: 'hello' }}>
          Linky!
        </ButtonLink>
        <br />
        <ListGroup>
          <ListGroupItemLink
            to="destination"
            params={{ someparam: '1' }}>
            Linky!
          </ListGroupItemLink>
        </ListGroup>
        <RouteHandler />
      </div>
    );
  }
});

var Destination = React.createClass({
  render: function() {
    return <div>You made it!</div>;
  }
});

var routes = (
  <Route handler={App} path="/">
    <Route name="destination" path="destination/:someparam" handler={Destination} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

*/

var Main = React.createClass({

  getInitialState: function() {

    return {
        eventList: []
    };

  },
  componentWillMount: function() {
       this.state.eventList.push("jee");
  },

  componentDidMount: function() {
      
  },


  render: function() {
    
 // <Header />
// <RouteHandler eventList={this.state.eventList} />

    return (
          <div>
            <Header />
            <Map />
            <div className="container">

              <RouteHandler />
            </div>
        </div>
    );
  }
});  // <RouteHandler {...@props}/>

var EventListsWrapper = React.createClass({
  render: function () {
    return (
        <EventList eventList={this.props.eventList} />
    );
  }
});


/*

var routes = (
    <Route handler={Main}>
      <DefaultRoute name="home" handler={EventListsWrapper} />
      <Route name="about" handler={About} />
      <Route name="eventForm" handler={EventForm} />
      <Route name="/events/:id" handler={EventPage} />
      <Route path="error" handler={NoMatch} />
      <NotFoundRoute handler={NoMatch}/>
    </Route>
);
*/

//       <DefaultRoute name="home" handler={EventListsWrapper} />
// <Route name='events' path='/events/:id' handler={EventPage} />

/*
React.render((
  <Router history={History}>
    <Route path="/" component={Main}>
      <Route path="home" component={EventListsWrapper}/>
      <Route path="about" component={About}/>
      <Route name="eventPage" path="events/:someparam" handler={EventPage} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('container'));

*/



// <Route name="eventPage" path="events/:someparam" handler={Destination} />
var routes = (
  <Route handler={Main} path="/">
    <DefaultRoute name="home" handler={EventListsWrapper} />
    <Route name="eventPage" path="events/:someparam" handler={EventPage} />
    <Route name="eventForm" handler={EventForm} />
    <Route name="about" handler={About} />
  </Route>
);

// Router.HistoryLocation
Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});


/*
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
*/



