window.$ = window.jQuery = require('jquery');

var React = require('react/addons');

var Router = require('react-router');

var Route = Router.Route
var RouteHandler = Router.RouteHandler
var DefaultRoute = Router.DefaultRoute
var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;

var Header = require('./js/header.js');
var Map = require('./js/map.js');
var About = require('./js/about.js');
var NoMatch = require('./js/noMatch.js');
var EventList = require('./js/event/eventList.js');
var EventForm = require('./js/event/eventForm.js');

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
    return (
    <div>
      <Header />
      <Map />
      <div className="container">
        <RouteHandler eventList={this.state.eventList} />
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

var routes = (
    <Route handler={Main}>
      <DefaultRoute name="home" handler={EventListsWrapper} />
      <Route name="about" handler={About} />
      <Route name="eventForm" handler={EventForm} />
      <Route path="error" handler={NoMatch} />
      <NotFoundRoute handler={NoMatch}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});