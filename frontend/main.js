var DefaultRoute, Header, Link, React, Route, RouteHandler, Router;

window.$ = window.jQuery = require('jquery');

require('semantic-ui-css/semantic');

React = require('react/addons');

Router = require('react-router');

Route = Router.Route, RouteHandler = Router.RouteHandler, DefaultRoute = Router.DefaultRoute, Link = Router.Link;


var Header = require('./js/header.js');
var Map = require('./js/map.js');

var About = require('./js/about.js');


var Home = React.createClass({
  render: function() {
    return (
    <div className="column">
      <div classNakme="ui segment">
        <h1 className="ui header">
          <span>Ge to work!</span>
          <div className="sub header">
            Me sadasdsure to check out README.md for development notes.
          </div>
        </h1>
      </div>
    </div>
    );
  }
});

var Main = React.createClass({
  render: function() {
    return (
    <div>
      <Header />
      <Map />
      <div className="ui page grid">
        <RouteHandler />
      </div>
    </div>
    );
  }
});  // <RouteHandler {...@props}/>


var routes = (
  <Route path="/" handler={Main}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="about" handler={About}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

/*
$(function() {
  return Router.run(routes, Router.HashLocation, Handler);
});


$ ->
  Router.run routes, Router.HashLocation, (Handler) ->
    React.render(<Handler/>, document.body)
*/