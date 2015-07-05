/*global sails*/
var io = require('./dependencies/sails.io.js')();
var React = require('react');

var Index = require('./react/index.js');

React.render(<Index />,document.body);

