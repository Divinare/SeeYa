import { browserHistory, Link } from 'react-router';
var React = require('react');
var validator = require('../../common/validators/validator.js');
var utils = require('../../common/utils.js');

const About = React.createClass({
    getInitialState: function() {
        return {
            showPassword: false,
            email: "",
            password: "",
            repeatPassword:""
        };
    },
    componentWillMount: function() {

    },

    componentDidMount: function() {
        this.props.handleResize();
    },

    toggleShowPassword: function() {
        $('#password').prop('type', $('#showPassword').prop('checked') ? 'text' : 'password');
        $('#repeatPassword').prop('type', $('#showPassword').prop('checked') ? 'text' : 'password');
   //     document.getElementById('password').type = this.showPassword ? 'text' : 'password'
    },


    submit: function(){
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
            };
            var success = function(){
                console.log( "success!!!" );
                browserHistory.push('/login');
            };
            UTILS.rest.addEntry('user', userData, success, error);
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
            <div>
                <div className='right-container'>
                    <div className="row">
                        <div className="col-xs-12">  
                            <h1>Signup</h1>
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
                                <div className="form-group">
                                    <label className="control-label" htmlFor="repeatPassword">Repeat password *</label>
                                        <input type="password" id="repeatPassword" name="repeatPassword" placeholder="" className="form-control" onChange={this.handleChange('repeatPassword')}/>
                                        <span id="repeatPasswordError"></span>
                                </div>
                                <div className = "form-group">
                                    <div className = "checkbox">
                                        <label><input type = "checkbox" id="showPassword" name="showPassword" onChange={this.toggleShowPassword} />Show password</label>
                                    </div>
                               </div>

                               {/* Submit */}
                                <div className="form-group">
                                    <button type="button" onClick={this.submit} className="btn btn-default">Signup</button>
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