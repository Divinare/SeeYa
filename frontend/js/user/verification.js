var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;
var Link = Router.Link;

var msgComponent = require('../utils/messageComponent.js');

const SHOW_MSG_SEC = 5;


const Verification = React.createClass({
    getInitialState: function() {
        return {

        };
    },

    componentWillMount: function() {
    },

    componentDidMount: function() {
        this.setToolbarIcons();
        this.props.handleResize();
    },

    setToolbarIcons: function() {
        var homeFunc = function() {
            browserHistory.push('/');
        }

        var toolbarComponentData = {
            "home": homeFunc
        }
        this.props.updateToolbarIcons(toolbarComponentData);
    },

    render: function(){

        return (
            <div id="verificationContainer">
                <h2>Verification</h2>
                <p>An email has been sent to your inbox for validation. Please check your email and click the link to validate your email.</p>
            </div>
        )

    }

});

module.exports = Verification;