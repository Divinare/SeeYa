window.$ = window.jQuery = require('jquery');

var React = require('react');

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
  , BrowserHistory = Router.History;

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
  <Router history={BrowserHistory}>
    <Route path="/" component={Main}>
      <Route path="home" component={EventListsWrapper}/>
      <Route path="about" component={About}/>
      <Route name="eventPage" path="events/:someparam" handler={EventPage} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('container'));
*/




var routes = (
  <Route handler={Main} path="/">
    <DefaultRoute name="home" path="/" handler={EventListsWrapper} />
    <Route name="eventPage" path="events/:someparam" handler={EventPage} />
    <Route name="eventForm" handler={EventForm} />
    <Route name="about" handler={About} />
  </Route>
);

// Router.HistoryLocation, 

$(document).ready(function () {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});


/*
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>

*/

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
/*
React.render(
  <CommentBox />,
  document.getElementById('container')
);
*/
/*
$(document).ready(function () {
  React.render(<CommentBox />, document.body);
});

*/