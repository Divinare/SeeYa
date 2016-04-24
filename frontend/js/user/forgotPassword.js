import { browserHistory, Link } from 'react-router';

var React = require('react');

var msgComponent = require('../utils/messageComponent.js');

const SHOW_MSG_SEC = 5;


const Settings = React.createClass({
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

    handleChange: function(key) {
       return function (e) {
           var state = {};
           state[key] = e.target.value;
           this.setState(state);
       }.bind(this);
    },


    render: function(){

        return (
            <div id="forgotPasswordContainer">
                <h2>Forgot password?</h2>
                <p>Todo</p>
            </div>
        )

    }

});

module.exports = Settings;