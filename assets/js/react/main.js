var React = require('react');

var Map = require('./map.js');

var Main = React.createClass({


  render: function(){
    return (
      <span>
        Hello...
        <Map />
      </span>
    )
  }

});

module.exports = Main;