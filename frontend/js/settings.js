import { browserHistory, Link } from 'react-router';

var React = require('react');
var validator = require('../../common/validators/validator.js');
var utils = require('../../common/utils.js');

const Settings = React.createClass({
    getInitialState: function() {
        return {
            signedIn: false
        };
    },

    componentWillMount: function() {
    },

    componentDidMount: function() {
        var that = this;
        var success = function() {
            console.log("is logged in");
            that.setState({
                signedIn: true
            })
        }
        var error = function(){
            console.log("is not logged in");
            that.setState({
                signedIn: false
            })
        }
        UTILS.rest.isLoggedIn(success, error);
        this.props.handleResize();
    },


    render: function(){
        if(this.state.signedIn){
            return (
                <div>
                    SETTINGS
                </div>
            )
        }else{
            return (
            <div>
                Not authorized
            </div>
            )
        }
    
    }

});

module.exports = Settings;