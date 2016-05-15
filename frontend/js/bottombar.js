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
        browserHistory.push('/');
    },

    render: function() {

        var location = UTILS.helper.getLocation();
        var drawBottombarBackButtom = (location == "eventPage") ? true : false;

        return (
            <div id="rightContainerBottomBar">
                <div id="bottombarLeftElements">
                    {drawBottombarBackButtom == true ?
                        <div id="bottombarBackButtom" className="btn btn-default btn-sm" onClick={this.backToEventsFunc}>
                            <div className="glyphicon glyphicon-chevron-left"></div><span>Back</span>
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