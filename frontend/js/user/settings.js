var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;
var Link = Router.Link;

var commonValidator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');
var frontValidator = UTILS.validator;
var msgComponent = require('../utils/messageComponent.js');

const SHOW_MSG_SEC = 5;


const Settings = React.createClass({
    getInitialState: function() {
        return {
            signedIn: false,
            username: "",
            oldPassword: "",
            password: "",
            repeatPassword: ""
        };
    },

    componentWillMount: function() {
    },

    componentDidMount: function() {
        this.setToolbarIcons();
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

    setToolbarIcons: function() {
        var homeFunc = function() {
            browserHistory.push('/');
        }

        var toolbarComponentData = {
            "home": homeFunc
        }
        this.props.updateToolbarIcons(toolbarComponentData);
    },

    toggleUsernameFields: function() {
        if($(".usernameForm").is(":visible")) {
            $(".usernameForm").hide(500);
        } else {
            $(".usernameForm").show(500);
            $(".passwordForm").hide(500);
        }

    },

    togglePasswordFields: function() {
        if($(".passwordForm").is(":visible")) {
            $(".passwordForm").hide(500);
        } else {
            $(".usernameForm").hide(500);
            $(".passwordForm").show(500);
        }

    },

    submitUsername: function() {
        var that = this;
        var username = this.state.username;
        var validUsername = frontValidator.validateField(commonValidator.validateUsername, 
                                            username,
                                            "#username",
                                            "#usernameError"
                                            );

        if(!validUsername) {
            console.log("___ Username was not valid.");
            return;
        }
        var userData = {
            username: username,
            fieldToChange: "username"
        }
        var error = function( jqXhr, textStatus, errorThrown){
            console.log("___ Changing username failed");
            console.log( errorThrown );
            console.log(jqXhr)
            console.log(jqXhr.responseJSON)
            if( jqXhr.responseJSON.errors.username != null && jqXhr.responseJSON.errors.username.length > 0) {
                frontValidator.setErrorToField("#username", jqXhr.responseJSON.errors.username, "#usernameError")
            }
        };
        var success = function(result){
            console.log("___ Succesfully changed username");
            that.props.updateAppStatus('user', result.user);
            browserHistory.push('/');
        };
        frontValidator.clearErrorFromField('#username', '#usernameError');
        UTILS.rest.editEntry('user', this.props.user.id, userData, success, error);
    },

    submitPassword: function() {
        var that = this;
        var oldPassword = this.state.oldPassword;
        var password = this.state.password;
        var repeatPassword = this.state.repeatPassword;

        // Clear old errors first
        frontValidator.clearErrorFromField("#oldPassword", "#oldPasswordError");
        frontValidator.clearErrorFromField("#password", "#passwordError");
        frontValidator.clearErrorFromField("#repeatPassword", "#repeatPasswordError");

        var params = {"password" :password, 
            "repeatPassword": repeatPassword
        };

        var validPassword = frontValidator.validateField(commonValidator.validatePassword, 
                                                password,
                                                "#password",
                                                "#passwordError"
                                                );

       var passwordsMatching = frontValidator.validateField(commonValidator.matchPasswords, 
                                                    params,
                                                    "#repeatPassword",
                                                    "#repeatPasswordError"
                                                    );


        if(!validPassword || !passwordsMatching) {
            console.log("____ Could not change password, validPassword: " + validPassword + " passwordsMatching: " + passwordsMatching);
            return;
        }

        var userData = {
            oldPassword: oldPassword,
            password: password,
            repeatPassword: repeatPassword,
            fieldToChange: "password"
        }
        var error = function( jqXhr, textStatus, errorThrown){
            frontValidator.setErrorToField("#oldPassword", jqXhr.responseJSON.errors.changePasswordDetails, "#oldPasswordError")
        };
        var success = function(result) {
            msgComponent.showMessageComponent('Password changed succesfully', SHOW_MSG_SEC * 1000, 'success')
            browserHistory.push('/');
        };
        UTILS.rest.editEntry('user', this.props.user.id, userData, success, error);
    },

    handleChange: function(key) {
       return function (e) {
           var state = {};
           state[key] = e.target.value;
           this.setState(state);
       }.bind(this);
    },


    render: function(){

        var username;
        if(this.props.user != null) {
            username = this.props.user.username;
        }

        if(this.state.signedIn){
            return (
                <div id="settingsContainer">
                    <h3>{username}</h3>
                    <p className="link" onClick={this.toggleUsernameFields}>Change username</p>

                    <form className="form usernameForm hiddenForToggle">
                        <div className="form-group">
                            <label className="control-label">Username</label>
                                <input type="text" id="username" className="form-control" onChange={this.handleChange('username')}/>
                                <span id="usernameError"></span>
                        </div>
                       {/* Submit */}
                        <div className="form-group">
                            <button type="button" onClick={this.submitUsername} className="btn btn-default">Submit</button>
                        </div>
                    </form>


                    <p className="link" onClick={this.togglePasswordFields}>Change password</p>

                    <form className="form passwordForm hiddenForToggle">

                        <div className="form-group">
                            <label className="control-label">Old password</label>
                                <input type="password" id="oldPassword" name="password" className="form-control" onChange={this.handleChange('oldPassword')}/>
                                <span id="oldPasswordError"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label">New password</label>
                                <input type="password" id="password" name="password" className="form-control" onChange={this.handleChange('password')}/>
                                <span id="passwordError"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Repeat new password</label>
                                <input type="password" id="repeatPassword" name="repeatPassword" className="form-control" onChange={this.handleChange('repeatPassword')}/>
                                <span id="repeatPasswordError"></span>
                        </div>
                       {/* Submit */}
                        <div className="form-group">
                            <button type="button" onClick={this.submitPassword} className="btn btn-default">Submit</button>
                        </div>
                    </form>

                </div>
            )
        } else{
            return (
            <div className="settingsPageContainer">
                <h4>Please login first to change settings</h4>
            </div>
            )
        }
    
    }

});

module.exports = Settings;