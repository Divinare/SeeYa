var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var browserHistory = Router.browserHistory;

const Bottombar = React.createClass({

    getInitialState: function() {

        return {
        };

    },

    componentDidMount: function() {

    },

    componentWillMount: function() {

    },

    backToEventsFunc: function() {
        console.log("BACK!?");
        browserHistory.push('/');
    },



    render: function() {

        var location = UTILS.helper.getLocation();
        var drawBottombarBackButtom = (location == "eventPage") ? true : false;

        return (
            <div id="rightContainerBottomBar">
                <div id="bottombarLeftElements">
                    {drawBottombarBackButtom == true ?
                        <div id="bottombarBackButtom" className="btn btn-default btn-sm">
                            <div className="bottomBarLink glyphicon glyphicon-chevron-left" onClick={this.backToEventsFunc}>Back</div>
                        </div>
                        :
                        <span></span>
                    }
                </div>
                <div id="bottombarRightElements">
                    <Link to="/termsOfService" className="link bottomBarLink">Terms of Service</Link>
                    <Link to="/contact" className="link bottomBarLink">Contact us</Link>
                </div>
            </div>
        )
    }

});

module.exports = Bottombar;