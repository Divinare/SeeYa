import { browserHistory, Link } from 'react-router';

var React = require('react');
var validator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');

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

    toggleUsernameFields: function() {
        $(".usernameForm").show(500);
        $(".passwordForm").hide(500);

    },

    togglePasswordFields: function() {
        $(".usernameForm").hide(500);
        $(".passwordForm").show(500);

    },

    submitUsername: function() {


        var that = this;
        var validEmail = validator.validateField(validator.validateEmail, 
                                            this.state.email,
                                            ["email"],
                                            ["emailError"]
                                            );

        var params = {"password" :this.state.password, 
            "repeatPassword": this.state.repeatPassword
        };


       var passwordsMatching = validator.validateField(validator.matchPasswords, 
                                                    params,
                                                    ["password", "repeatPassword"],
                                                    ["passwordError", "repeatPasswordError"]
                                                    );

        var validPassword = validator.validateField(validator.validatePassword, 
                                                this.state.password,
                                                ["password"],
                                                ["passwordError"]
                                                );

        if(validEmail && passwordsMatching && validPassword){
            console.log("form is valid")
            var userData = {
                email: this.state.email,
                password: this.state.password,
                repeatPassword: this.state.repeatPassword
            }
            var error = function( jqXhr, textStatus, errorThrown){
                console.log("error")
                console.log( errorThrown );
                console.log(jqXhr)
                console.log(jqXhr.responseJSON.userEmail)
                if( jqXhr.responseJSON.userEmail.length > 0){
                    validator.setErrorToField('email', [that.state.email + ' already in use'], 'emailError');
                }
                $('#serverErrorDiv').show(500);

            };
            var success = function(result){
                console.log( "success!!!" );
                that.props.updateAppStatus('user', result.user);
                browserHistory.push('/');
            };
            $("#serverErrorDiv").hide(200);
            validator.clearErrorFromField('email', 'emailError');
            UTILS.rest.addEntry('user', userData, success, error);
        } else{
            console.log("form is invalid")
        }

    },

    submitPassword: function() {


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
                <div className="settingsPageContainer">
                    <h3>Username: {username}</h3>
                    <p className="link" onClick={this.toggleUsernameFields}>Change username</p>

                    <form className="form usernameForm hiddenForToggle">
                        <div className="form-group">
                            <label className="control-label">Email</label>
                                <input type="text" id="email" name="email" placeholder="" className="form-control" onChange={this.handleChange('username')}/>
                                <span id="emailError"></span>
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
                                <input type="password" id="password" name="password" className="form-control" onChange={this.handleChange('oldPassword')}/>
                                <span id="passwordError"></span>
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