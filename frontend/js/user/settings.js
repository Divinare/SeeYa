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
        console.log("USER:");
        console.log(this.props.user);

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