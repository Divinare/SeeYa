window.$ = window.jQuery = require('jquery');

var React = require('react');

var Header = require('./js/header.js');
var Map = require('./js/map.js');
var About = require('./js/about.js');
var NoMatch = require('./js/noMatch.js');
var EventList = require('./js/event/eventList.js');
var EventForm = require('./js/event/eventForm.js');
var EventPage = require('./js/event/eventPage.js');
var URL = require('./js/url.js');

var Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , BrowserHistory = Router.History;

var Main = React.createClass({

  getInitialState: function() {

    return {
        eventList: []
    };

  },
  componentWillMount: function() {
    console.log(URL.eventsAll);
    var that = this;
    $.ajax({ 
      type: 'GET', 
      url: URL.eventsAll,
      dataType: 'json',
      success: function (data) { 
        that.setState({
          eventList: data
        })
        console.log(data);
      }
    });
  },

  componentDidMount: function() {
          console.log("hmm2");
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
  <Route handler={Main} path="/">
    <Route name="home" path="/" handler={EventListsWrapper} />
    <Route name="eventPage" path="events/:someparam" handler={EventPage} />
    <Route name="eventForm" handler={EventForm} />
    <Route name="about" handler={About} />
    <Route path="*" handler={NoMatch}/>
  </Route>
);

$(document).ready(function () {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});