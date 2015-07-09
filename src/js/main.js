var React = require('react');

var Index = require('./react/index.js');
/*
var Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , Route = Router.Route;
 
var ReactBootstrap = require('react-bootstrap')
  , Nav = ReactBootstrap.Nav
  , ListGroup = ReactBootstrap.ListGroup;
 
var ReactRouterBootstrap = require('react-router-bootstrap')
  , NavItemLink = ReactRouterBootstrap.NavItemLink
  , ButtonLink = ReactRouterBootstrap.ButtonLink
  , ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;
*/

//React.render(<Index />,document.body);

import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

var App = React.createClass({/*...*/});
var About = React.createClass({/*...*/});
// etc.

var Users = React.createClass({
  render() {
    return (
      <div>
        <h1>Users</h1>
        <div className="master">
          <ul>
            {/* use Link to route around the app */}
            {this.state.users.map(user => (
              <li><Link to={`/users/${users.id}`}>{user.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    );
  }
});

var User = React.createClass({
  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      user: findUserById(this.props.params.userId)
    });
  },

  render() {
    return (
      <div>
        <h2>{this.state.user.name}</h2>
        {/* etc. */}
      </div>
    );
  }
});

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
React.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body);