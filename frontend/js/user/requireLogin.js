import { browserHistory, Link } from 'react-router';

var React = require('react');
var commonValidator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');
var validator = UTILS.validator;
var msgComponent = require('../utils/messageComponent.js');
const SHOW_ERROR_MSG_SEC = 5;


const RequireLogin = React.createClass({
    getInitialState: function() {
        return {
            loginStatusPending: true,
            user: null
        };
    },

    componentDidMount: function(){
        this.checkLoginStatus();
    },

    checkLoginStatus: function(){
        this.setState({
            loginStatusPending:true
        })
        var that = this;
        var success = function(result) {
            that.props.updateAppStatus('user', result.user);
            that.setState({
                loginStatusPending: false,
                user: result.user
            })
        }
        var error = function(){
            that.props.updateAppStatus('user', null);
            msgComponent.showMessageComponent('Please log in first!', SHOW_ERROR_MSG_SEC * 1000, 'error')
            browserHistory.push('/login');
        }
        UTILS.rest.isLoggedIn(success, error);
    },

    render: function(){
        return(
            <div>
                { this.state.loginStatusPending ? 
                    <h2 className="centeredVertHor">Loading...</h2>
                    :
                    <div>
                        {React.cloneElement(this.props.children, {
                            eventList: this.props.eventList,
                            filteredEventList: this.props.filteredEventList,
                            eventListData: this.props.eventListData,
                            newEventMarker: this.props.newEventMarker,
                            handleResize: this.props.handleResize,
                            updateAppStatus: this.props.updateAppStatus,
                            getAppStatus: this.props.getAppStatus,
                            getEvents: this.props.getEvents,
                            user: this.state.user,
                            updateToolbarIcons: this.props.updateToolbarIcons
                        })}
                    </div>
                }
            </div>
        )
        
    }
});

module.exports = RequireLogin;



