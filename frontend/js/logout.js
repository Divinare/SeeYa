import { browserHistory, Link } from 'react-router';

module.exports = React.createClass({
    componentDidMount: function() {
        this.props.handleResize();
        //logout
        var that = this;
        var error = function( jqXhr, textStatus, errorThrown){
                console.log("error")
                console.log(textStatus)
                console.log(jqXhr)
                console.log( errorThrown );
            };
            var success = function(result){
                console.log( "success!!!" );
                console.log( result );
                that.props.updateAppStatus('username', '');
                browserHistory.push('/');
            };
        UTILS.rest.logout(success, error);
    },
    toggleShowEventForm: function() {
        this.props.toggleShowEventForm();
    },

    showEventList: function() {
        this.props.showEventList();
    },

    openNavbar: function() {
        $("#navbar-mobile").removeClass("hidden");
    },

    closeNavbar: function() {
        $("#navbar-mobile").addClass("hidden");
    },

    render: function(){
        return (
            <div className='right-container'>
                Logging out...
            </div>
        )
    }

});