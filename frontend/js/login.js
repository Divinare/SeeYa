import { browserHistory, Link } from 'react-router';

var React = require('react');
var validator = require('../../common/validators/validator.js');
var utils = require('../../common/utils.js');
const EMAIL_FORMAT = "Wrong format. Email address in form 'abc@cde.efg' expected";
const PASSWORD_EMPTY = "Password is required!";

const About = React.createClass({
    getInitialState: function() {
        return {
            showPassword: false,
            email: "",
            password: ""
        };
    },
    componentWillMount: function() {

    },

    componentDidMount: function() {
        this.props.handleResize();
    },

    toggleShowPassword: function() {
        $('#password').prop('type', $('#showPassword').prop('checked') ? 'text' : 'password');
   //     document.getElementById('password').type = this.showPassword ? 'text' : 'password'
    },


    submit: function(){
        var that = this;
        var validEmail = this.validateField(validator.validateEmail, 
                                            this.state.email,
                                            ["email"],
                                            ["emailError"]
                                            );

        var validPassword = this.validateField(validator.validateNotEmpty, 
                                            this.state.password,
                                            ["password"],
                                            ["passwordError"],
                                            PASSWORD_EMPTY
                                            );

        if(validPassword && validEmail){
            console.log("form is valid")
            var userData = {
                email: this.state.email,
                password: this.state.password
            }
            var error = function( jqXhr, textStatus, errorThrown){
                console.log("error")
                console.log(textStatus)
                console.log(jqXhr)
                console.log( errorThrown );
            };
            var success = function(result){
                console.log( "success!!!" );
                console.log( result );
                that.props.updateAppStatus('loggedIn', true);
                that.props.updateAppStatus('username', result.user.username);
                browserHistory.push('/');
            };
            UTILS.rest.addEntry('session', userData, success, error);

        }else{
            console.log("form is invalid")
        }

    },

    //Expects the func to return error message that can be shown
    validateField: function(func, params, fields, errorFields, message) {
        console.log("validatefield")
        var errormsg = func(params, message);
        console.log("errormsg: " + errormsg)

        // Validation failed
        if( utils.notEmpty(errormsg) ) {
            for(var i = 0; i < fields.length; i++){
                $("#" + fields[i]).addClass('invalid')
                $("#" + errorFields[i]).text(errormsg);
            }
            return false;
        } else {
            for(var i = 0; i < fields.length; i++){
                $("#" + fields[i]).removeClass('invalid')
                 // Clear the error message if it exists
                $("#" + errorFields[i]).text("");
            }
            return true;
        }
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
            <div>
                <div className='right-container'>
                    <div className="row">
                        <div className="col-xs-12">  
                            <h1>Login</h1>
                            <form className="form">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="email">Email *</label>
                                        <input type="text" id="email" name="email" placeholder="" className="form-control" onChange={this.handleChange('email')}/>
                                        <span id="emailError"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label" htmlFor="password">Password *</label>
                                        <input type="password" id="password" name="password" placeholder="" className="form-control" onChange={this.handleChange('password')}/>
                                        <span id="passwordError"></span>
                                </div>
                                <div className = "form-group">
                                    <div className = "checkbox">
                                        <label><input type = "checkbox" id="showPassword" name="showPassword" onChange={this.toggleShowPassword} />Show password</label>
                                    </div>
                               </div>

                               {/* Submit */}
                                <div className="form-group">
                                    <button type="button" onClick={this.submit} className="btn btn-default">Login</button>
                                </div>
                            </form>
                        </div>  
                    </div>
                </div>
            </div>
            )
    }

});

module.exports = About;