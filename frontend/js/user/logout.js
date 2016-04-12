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
                that.props.updateAppStatus('user', null);
                that.deleteCookie('seeyaSession')
                browserHistory.push('/');
            };
        UTILS.rest.logout(success, error);
    },

    deleteCookie: function(name){
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
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
            <div>
                Logging out...
            </div>
        )
    }

});