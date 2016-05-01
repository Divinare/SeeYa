var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;

const TermsOfService = React.createClass({


    getInitialState: function() {

        return {

        };

    },
    componentWillMount: function() {

    },

    componentDidMount: function() {
        this.setToolbarIcons();
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


    render: function(){
        return (
            <div id="termsOfServiceContainer">
                <h2 className="topicText">Terms of Service</h2>


                <p>SeeYa is a community for creating and joining events nearby. Discover new events, gain new experiences with other people and have fun.</p>
                <p>Simple and easy way to explore events near you or far away. SeeYa was developed in 2016 by a small group of friends in Helsinki, Finland.
                </p>

              <dl>
                <dt>1. Illegal content</dt>
                    <dd>Do not post any illegal content or content that others may consider offensive.</dd>
                <dt>2. Inappropriate content</dt>
                    <dd>Inappropriate events may get deleted without notice or explanation</dd>
                <dt>3. Cookies</dt>
                    <dd>SeeYa uses cookies. By using this website and agreeing to these terms and conditions, you consent to SeeYa’s use of cookies.</dd>
                <dt>4. Use common sense</dt>
                    <dd>Use common sense when meeting people you don’t know. SeeYa or its developers take no responsibility in anything that happens in the events organized by using SeeYa.</dd>
                <dt>5. Follow the rules</dt>
                    <dd>Breaking any of these rules or other malicious actions towards the website or its users may result in the user account being terminated without notice or explanation.</dd>
              </dl>    



                <br />
                <br />


            </div>
            )
    }

});

module.exports = TermsOfService;