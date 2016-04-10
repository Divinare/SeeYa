import { browserHistory, Link } from 'react-router';

var React = require('react');
var commonValidator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');
var validator = UTILS.validator;
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
        $('#serverErrorDiv').hide();
    },

    toggleShowPassword: function() {
        $('#password').prop('type', $('#showPassword').prop('checked') ? 'text' : 'password');
   //     document.getElementById('password').type = this.showPassword ? 'text' : 'password'
    },


    /*don't validate email and password here (other than checking that they are not empty), only in backend.
     This is because if our validations have changed after the user first signed up, 
     we still want them to be able to sign in.
    */
    submit: function(){
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
               console.log(jqXhr.responseJSON.errorMessage)
               $("#serverErrorDiv").text(jqXhr.responseJSON.errorMessage);
               $("#serverErrorDiv").show(500);
            };
            var success = function(result){
                console.log( "success!!!" );
                console.log( result );
                that.props.updateAppStatus('user', result.user);
                browserHistory.push('/');
            };
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

    render: function(){
        return (
            <div className="row loginPageContainer">
                <div className="col-xs-12">  
                    <h1>Login</h1>
                    <div id='serverErrorDiv'></div>
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
        )
    }

});

module.exports = About;