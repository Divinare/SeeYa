var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;
var Link = Router.Link;

var commonValidator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');
var validator = UTILS.validator;
var frontValidator = require('../utils/validator.js')
var msgComponent = require('../utils/messageComponent.js');

const SHOW_MSG_SEC = 5;


const About = React.createClass({
    getInitialState: function() {
        return {
            email: "",
            username: "",
            password: "",
            repeatPassword:""
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

    submit: function(e){
        e.preventDefault();
        var that = this;
        var userData = this.state;
        var error = function( jqXhr, textStatus, errorThrown){
            console.log("error")
            console.log( errorThrown );
            console.log(jqXhr)
            //console.log(jqXhr.responseJSON.errors.userEmail)
            if( jqXhr.responseJSON.errors.userEmail != null && jqXhr.responseJSON.errors.userEmail.length > 0){
                frontValidator.setErrorToField('#email', jqXhr.responseJSON.errors.userEmail, '#emailError');
            }

            if( jqXhr.responseJSON.errors.username != null &&  jqXhr.responseJSON.errors.username.length > 0){
                frontValidator.setErrorToField('#username', jqXhr.responseJSON.errors.username, '#usernameError');
            }

            if( jqXhr.responseJSON.errors.userPassword != null &&  jqXhr.responseJSON.errors.userPassword.length > 0){
                frontValidator.setErrorToField('#password', jqXhr.responseJSON.errors.userPassword, '#passwordError');
            }

            if( jqXhr.responseJSON.errors.userRepeatPassword != null && jqXhr.responseJSON.errors.userRepeatPassword.length > 0){
                frontValidator.setErrorToField('#repeatPassword', jqXhr.responseJSON.errors.userRepeatPassword, '#repeatPasswordError');
            }

        };
        var success = function(result){
            console.log(result.user);
            that.props.updateAppStatus('user', result.user);
            browserHistory.push('/emailVerification');
            msgComponent.showMessageComponent('Account created succesfully! A verification email has been sent to your inbox for you to verify your email address.', SHOW_MSG_SEC * 1000, 'success')
        };
        frontValidator.clearErrorFromField('#email', '#emailError');
        frontValidator.clearErrorFromField('#username', '#usernameError');
        frontValidator.clearErrorFromField('#password', '#passwordError');
        frontValidator.clearErrorFromField('#repeatPassword', '#repeatPasswordError');
        UTILS.rest.addEntry('user', userData, success, error);
    },

    handleChange: function(key) {
       return function (e) {
           var state = {};
           state[key] = e.target.value;
           this.setState(state);
       }.bind(this);
    },

    render: function(){ // col-xs-offset-2 col-xs-8 col-sm-offset-0 col-sm-12 col-md-offset-0 col-md-12
        return (
            <div id="signupContainer">
                <div id="signupForm">  
                    <h2 className="topicText">Sign up</h2>
                    <form className="form">
                        <div className="form-group">
                                <input type="text" id="email" name="email" placeholder="Email" className="form-control" onChange={this.handleChange('email')}/>
                                <span id="emailError"></span>
                        </div>
                        <div className="form-group">
                            <input type="text" id="username" name="username" placeholder="Username (optional)" className="form-control" onChange={this.handleChange('username')}/>
                            <span id="usernameError"></span>
                        </div>
                        <div className="form-group">
                                <input type="password" required='true' id="password" name="password" placeholder="Password" className="form-control" onChange={this.handleChange('password')}/>
                                <span id="passwordError"></span>
                        </div>
                        <div className="form-group">
                                <input type="password" id="repeatPassword" name="repeatPassword" placeholder="Repeat password" className="form-control" onChange={this.handleChange('repeatPassword')}/>
                                <span id="repeatPasswordError"></span>
                        </div>
    
                       {/* Submit */}
                        <div className="form-group">
                            <button type="submit" onClick={this.submit} className="btn btn-primary btn-block">Sign up</button>
                        </div>
                    </form>
                </div>  
            </div>
            )
    }

});

module.exports = About;