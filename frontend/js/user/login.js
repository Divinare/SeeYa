import { browserHistory, Link } from 'react-router';

var React = require('react');
var commonValidator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');
var validator = UTILS.validator;
var frontValidator = require('../utils/validator.js')
const PASSWORD_EMPTY = "Password is required!";

const About = React.createClass({
    getInitialState: function() {
        return {
            email: "",
            password: ""
        };
    },
    componentWillMount: function() {

    },

    componentDidMount: function() {
        this.setToolbarIcons();
        this.props.handleResize();
        $('#serverErrorDiv').hide();
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


    /*don't validate email and password here (other than checking that they are not empty), only in backend.
     This is because if our validations have changed after the user first signed up, 
     we still want them to be able to sign in.
    */
    submit: function(e){
        e.preventDefault();
        var that = this;
        var validEmail = validator.validateField(commonValidator.validateNotEmpty, 
                                            this.state.email,
                                            "#email",
                                            "#emailError"
                                            );

        var validPassword = validator.validateField(commonValidator.validateNotEmpty, 
                                            this.state.password,
                                            "#password",
                                            "#passwordError",
                                            PASSWORD_EMPTY
                                            );

        if(validPassword && validEmail){
            console.log("form is valid")
            var userData = {
                email: this.state.email,
                password: this.state.password
            }
            var error = function( jqXhr, textStatus, errorThrown){
               // console.log(jqXhr)
               console.log("error function")
               console.log(jqXhr.responseJSON.errors)
               if(jqXhr.responseJSON.errors != null && jqXhr.responseJSON.errors.loginDetails != null){
                     console.log("login detail error")
                     console.log(jqXhr.responseJSON.errors['loginDetails'])
                    $("#serverErrorDiv").text(jqXhr.responseJSON.errors['loginDetails']);
                    $("#serverErrorDiv").show(500);
                    frontValidator.setErrorToField('#email', [], '#emailError');
                    frontValidator.setErrorToField('#password', [], '#passwordError');
                    
               }

        
            };
            var success = function(result){
                console.log( "success!!!" );
                console.log( result );
                that.props.updateAppStatus('user', result.user);
                browserHistory.push('/');
            };
            frontValidator.clearErrorFromField('#email', '#emailError');
            frontValidator.clearErrorFromField('#password', '#passwordError');
            $("#serverErrorDiv").hide(200);
            UTILS.rest.addEntry('session', userData, success, error);

        }else{
            console.log("form is invalid")
        }

    },

    handleChange: function(key) {
       return function (e) {
           var state = {};
           state[key] = e.target.value;
           this.setState(state);
       }.bind(this);
    },

    render: function() {
        return (
            <div id="loginContainer">
                <div id="loginForm">  
                    <h2 className="topicText">Login</h2>
                    <div id='serverErrorDiv'></div>
                    <form className="form">
                        <div className="form-group">
                                <input type="text" id="email" name="email" placeholder="Email" className="form-control" onChange={this.handleChange('email')}/>
                                <span id="emailError"></span>
                        </div>
                        <div className="form-group">
                                <input type="password" id="password" name="password" placeholder="Password" className="form-control" onChange={this.handleChange('password')}/>
                                <span id="passwordError"></span>
                        </div>

                       {/* Submit */}
                        <div className="form-group">
                            <button type="submit" id="loginButton" onClick={this.submit} className="btn btn-primary btn-block">Log in</button>
                        </div>
                    </form>

                    <h3 id="areYouNewTopic">Are you new to Seeya?</h3>
                    <div className="btn btn-default signupButton"><Link to="/signup">Sign up</Link></div>

                </div>  
            </div>
        )
    }

});

module.exports = About;