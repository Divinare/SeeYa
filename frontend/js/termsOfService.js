var React = require('react');

var TermsOfService = React.createClass({


    getInitialState: function() {

        return {

        };

    },
    componentWillMount: function() {

    },

    componentDidMount: function() {

    },


    render: function(){
        return (
            <div id="termsOfServiceContainer">
                <h2 className="topicText">Terms of Service</h2>


                <p>SeeYa is a community for creating and joining events nearby. Discover new events, gain new experiences with other people and have fun.</p>
                <p>Simple and easy way to explore events near you or far away. SeeYa was developed in 2016 by a small group of friends in Helsinki, Finland.
                <em>This text is emphasized.</em></p>

              <dl>
                <dt>1. Key Terms</dt>
                <dd> SeeYa is a community for creating and joining events nearby. Discover new events, gain new experiences with other people and have fun. </dd>
                <dt>2. Account Registeration</dt>
                <dd> SeeYa is a community for creating and joining events nearby. Discover new events, gain new experiences with other people and have fun. </dd>
              </dl>    



                <br />
                <br />


            </div>
            )
    }

});

module.exports = TermsOfService;