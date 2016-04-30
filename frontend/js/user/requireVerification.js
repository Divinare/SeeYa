var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;
var Link = Router.Link;

var commonValidator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');
var validator = UTILS.validator;
var msgComponent = require('../utils/messageComponent.js');
const SHOW_ERROR_MSG_SEC = 5;


const RequireLogin = React.createClass({
    getInitialState: function() {
        return {
            verificationStatusPending: true,
            user: null
        };
    },

    componentDidMount: function() {
        this.checkLoginStatus();
    },

    checkLoginStatus: function() {
        
        this.setState({
            verificationStatusPending: true
        })

        var that = this;
        var success = function(result) {
            console.log(result);
            //that.props.updateAppStatus('user', result.user);
            that.setState({
                verificationStatusPending: false
            })
        }
        var error = function(error) {
            console.log("Error");
            console.log(error);
            msgComponent.showMessageComponent('Please verify your email first', SHOW_ERROR_MSG_SEC * 1000, 'error')
            browserHistory.push('/emailVerification');
        }
        UTILS.rest.authorization("isEmailVerified", success, error);
        
    },

    render: function() {
        return(
            <div>
                { this.state.verificationStatusPending ? 
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
                            user: this.props.user,
                            updateToolbarIcons: this.props.updateToolbarIcons
                        })}
                    </div>
                }
            </div>
        )
        
    }
});

module.exports = RequireLogin;



