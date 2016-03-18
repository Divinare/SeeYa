var React = require('react');

const About = React.createClass({


    getInitialState: function() {

        return {
            showPassword: false
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

    render: function(){
        return (
            <div className='signupContent'>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-6 col-md-offset-3">  
                            <div id="formBox">
                                <h1>Signup</h1>
                                <form className="form" action="" method="POST">
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="email">Email</label>
                                            <input type="text" id="email" name="email" placeholder="" className="form-control input-lg"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="password">Password</label>
                                            <input type="password" id="password" name="password" placeholder="" className="form-control input-lg"/>
                                            <p className="help-block">Username can contain any letters or numbers, without spaces</p>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="repeatPassword">Repeat password</label>
                                            <input type="password" id="repeatPassword" name="repeatPassword" placeholder="" className="form-control input-lg"/>
                                            <p className="help-block">Username can contain any letters or numbers, without spaces</p>
                                    </div>
                                    <div className = "form-group">
                                        <div className = "checkbox">
                                            <label><input type = "checkbox" id="showPassword" name="showPassword" onChange={this.toggleShowPassword} />Show password</label>
                                        </div>
                                   </div>
                                </form>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            )
    }

});

module.exports = About;