var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;
var Link = Router.Link;

var helper = require('../utils/helper.js');
var msgComponent = require('../utils/messageComponent.js');

const SHOW_MSG_SEC = 8;


const Verification = React.createClass({
    getInitialState: function() {
        return {
            emailVerificationHasFailed: false,
            emailVerificationSent: null
        };
    },

    componentWillMount: function() {
    },

    componentDidMount: function() {
        var that = this;
        this.setToolbarIcons();
        this.props.handleResize();
        console.log("getting user");

        var user = this.props.user;
        console.log("done getting user");
        if(user != null && user.emailVerified) {
            console.log("___ User email already verified");
            msgComponent.showMessageComponent('Your email has already been verified', SHOW_MSG_SEC * 1000, 'success')
            browserHistory.push('/');
        }

        var emailVerificationId = this.getEmailVerificationId();
        if(emailVerificationId != null) {
            var emailVerificationData = {
                emailVerificationId: emailVerificationId
            }

            var success = function(result) {
                if(user != null) {
                    that.props.updateAppStatus('user', result.user);
                }
                msgComponent.showMessageComponent('Email verified successfully! Now you can join to events and create them.', SHOW_MSG_SEC * 1000, 'success')
                browserHistory.push('/');
            }

            var error = function(jqXhr, textStatus, errorThrown) {
                console.log("Verification error!");
                console.log("error")
                console.log( errorThrown );
                console.log(jqXhr)
                msgComponent.showMessageComponent('Email verification failed. Did you use the correct email verification link?', SHOW_MSG_SEC * 1000, 'error')
                that.setState({
                    emailVerificationHasFailed: true
                })
            }
            UTILS.rest.verifyEmail('verifyUserEmail', emailVerificationData, success, error);
        }
    },

    getEmailVerificationId: function() {
        var tokens = helper.getUrlTokens();
        var emailVerificationId = tokens[tokens.length-1];
        if(emailVerificationId.chaarAt(0) == "?") {
            // Take off the first character which is "?""
            emailVerificationId = emailVerificationId.substring(1);
            return emailVerificationId;
        } else {
            return null;
        }
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

    sendEmailVerificationEmail: function() {

        var lastEmailSent = this.state.emailVerificationSent;
        var currentTime = Date.now();
        var milliSecondsSinceLastEmailWasSent = (currentTime - lastEmailSent);
        if(milliSecondsSinceLastEmailWasSent < 10000) {
            msgComponent.showMessageComponent('Verification email is already being sent to your inbox', SHOW_MSG_SEC * 1000, 'error')
        } else {

            this.setState({
                emailVerificationSent: currentTime
            })

            var success = function() {
                console.log("Another email has been sent!");
                msgComponent.showMessageComponent('Another verification email has been sent to your inbox. Please check it and follow the link to verify your email.', SHOW_MSG_SEC * 1000, 'success')
                browserHistory.push('/emailVerification');
            }

            var error = function(jqXhr, textStatus, errorThrown) {
                console.log("Error on sending verification");
                console.log(jqXhr);
                msgComponent.showMessageComponent('Maximum limit for sending emails has been reached.', SHOW_MSG_SEC * 1000, 'error')
            }
            console.log("SENDING VERIFICATION EMAIL!");

            UTILS.rest.verifyEmail('sendVerificationEmail', {}, success, error);
            msgComponent.showMessageComponent('New verification email has been sent to your inbox', SHOW_MSG_SEC * 1000, 'success')
        }
    },

    render: function(){
        var emailVerificationId = this.getEmailVerificationId();

        if(this.state.emailVerificationHasFailed) {
                return (
                    <div id="emailVerificationContainer">
                        <h2>Email verification</h2>
                        <p>Email verification failed. Perhaps the verification link is invalid. Please try to copy and paste the whole verification link to your browser.</p>
                    </div>
                )
        } else {
            if(emailVerificationId == null) {
                return (
                    <div id="emailVerificationContainer">
                        <h2>Email verification</h2>
                        <p>An email has been sent to your email address for email verification. Please check your email and click the link to verify your email. Also remember to check from your spam folder.</p>
                        <a onClick={this.sendEmailVerificationEmail} id="sendAnotherVerificationEmail">Click here to send another email</a>
                    </div>
                )
            } else {
                return (
                    <div id="emailVerificationContainer">
                        <h2>Email verification</h2>
                        <p>Verifying email...</p>
                    </div>
                )
            }
        }

    }

});

module.exports = Verification;