var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;

var msgComponent = require('../utils/messageComponent.js');
var constants = require('../utils/constants.js');



const OAuthError = React.createClass({
    componentDidMount: function() {
        msgComponent.showMessageComponent(this.props.params.message, 7000, 'error')
        browserHistory.push("/");
    },

    render: function(){
        return (<div></div>)
    }
});

module.exports = OAuthError;