var React = require('react');
var Router = require('react-router');
var Moment = require('moment');

var commonUtils = require('../../../common/utils.js');


var Confirm = require('../modal/confirm.js')
var reactDom = require('react-dom')
var msgComponent = require('../utils/messageComponent.js');
var constants = require('../utils/constants.js');
//import { render } from 'react-dom'
const SHOW_MSG_SEC = 5;

var Link = Router.Link;

import { browserHistory } from 'react-router';

$ = window.jQuery = require('jquery');

const EventPage = React.createClass({

    getInitialState: function() {           
            
        return {
             event: null,
             showModal: false,
             editingAllowed: false,
             loginStatusPending: true,
             fetchingAttendees: true,
             attendees: [],
             userAttending: null,    //tells if the user is attending this event already or not
             adminUser: false,
             comment: null
        };

    },

    close: function() {
        this.setState({ showModal: false });
    },

    open: function() {
        this.setState({ showModal: true });
    },

    componentDidUpdate: function(prevProps, prevState) {
        if( prevState.fetchingAttendees && !this.state.fetchingAttendees ){  //we got the attendees now
            if( !this.state.loginStatusPending && this.props.getAppStatus('user') != null ){
                this.updateUserAttendingInfo();
                this.setToolbarIcons();
            } 
        }

        if( prevState.loginStatusPending && !this.state.loginStatusPending ){    //login status updated
            if( !this.state.fetchingAttendees && this.props.getAppStatus('user') != null){
                this.updateUserAttendingInfo();
                this.setToolbarIcons();
            }
        }
    },

    componentWillUpdate: function(){
        this.updateEditingPrivileges(this.state.event);
    },

    updateEditingPrivileges: function(event){
        var user = this.props.getAppStatus('user')
        if( typeof user === 'undefined' 
            || typeof event === 'undefined'
            || user === null
            || event === null){
            return
        }
        if( event.creator === user.id ){
            if(this.state.editingAllowed === false){
                this.setState({
                    editingAllowed: true
                })
            }
        }
    },

    //only call this method when the user log in status has been checked and attendances have been fetched
    updateUserAttendingInfo: function(){
        var loggedInUser = this.props.getAppStatus('user');
        var attending = false;
        for(var i = 0; i < this.state.attendees.length; i++){
            if( this.state.attendees[i].id === loggedInUser.id){
                this.setState({
                    userAttending: true,
                    comment: this.state.attendees[i]['Attendances.comment']
                })
                attending = true;
            }
        }
        if( !attending ){
            this.setState({
                userAttending: false
            })
        }   
    },

    componentWillMount: function() {
        
    },

    componentWillUnmount: function() {
        this.props.updateAppStatus("shownEventData", {});
    },

    componentDidMount: function() {
        var tokens = UTILS.helper.getUrlTokens();
        var eventId = tokens[tokens.length - 1];
        this.setToolbarIcons();
        this.props.handleResize();
        this.fetchEvent(eventId);
        this.checkIfUserLoggedIn();
        this.fetchAttendees(eventId);
    },

    setToolbarIcons: function() {
        var homeFunc = function() {
            browserHistory.push('/');
        }

        var editFunc = this.moveToEditForm;

        var deleteFunc = function() {
            this.confirmDelete();
        }.bind(this);

        var toolbarComponentData = {
            "home": homeFunc
        }
        if(this.state.editingAllowed){
            toolbarComponentData["edit"] = editFunc;
        }
        if(this.state.editingAllowed || this.state.adminUser){
            toolbarComponentData["delete"] = deleteFunc;
        }
        this.props.updateToolbarIcons(toolbarComponentData);
    },

    fetchEvent: function(eventId){
        var that = this;
        var onSuccess = function (eventData) {
            if(that.isMounted()){
                that.setState({
                    event: eventData
                })
                that.updateEditingPrivileges(eventData);
                that.props.updateAppStatus("shownEventData", eventData);
            }
        };

        var onError = function() {
            console.log("Error on fetching event!");
            msgComponent.showMessageComponent('Could not find the event', constants.SHOW_MSG_MS_DEFAULT, 'error')
            browserHistory.push('/');
        }
        UTILS.rest.getEntry('event', eventId, onSuccess, onError);
    },

    checkIfUserLoggedIn: function(){
        var that = this;
        var success = function(result) {
            if(that.isMounted()){
                that.props.updateAppStatus('user', result.user);
                var admin = false;
                if(result.user.role === 'Admin'){
                    admin = true;
                }
                that.setState({
                    loginStatusPending: false,
                    adminUser: admin
                })

            }
        }
        var error = function( jqXhr, textStatus, errorThrown ){
            if(that.isMounted()){
                 that.props.updateAppStatus('user', null);
                that.setState({
                    loginStatusPending: false
                })
            }
        }
        UTILS.rest.isLoggedIn(success, error);
    },

    fetchAttendees: function(eventId){
        var that = this;
        var success = function(result) {
            if(that.isMounted()){
               var attendees = [];
                if( result != null && result.users != null){
                    attendees = result.users;
                }
                that.setState({
                    fetchingAttendees: false,
                    attendees: attendees
                })
            }
        }
        var error = function(jqXhr, textStatus, errorThrown){
            console.log(errorThrown)
            if(that.isMounted()){
                that.setState({
                    fetchingAttendees: false,
                })
            }
        }
        UTILS.rest.getUsersAttendingEvent(eventId, success, error);
    },


    addAttendance: function(e) {
        var that = this;
        var event = this.state.event;
        var data = {
            comment: this.state.comment,
            event: event
        }
        var success = function(){
            that.props.getEvents(); 
            browserHistory.push('/');
        };              
        var error = function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
        UTILS.rest.addEntry('attendance', data, success, error);
    },

    confirmDelete: function(){
        var that = this;
        return this.showModal('Are you sure?', {
            description: 'Do you really want to delete the event?',
            confirmLabel: 'Yes',
            abortLabel: 'No'
        }).then((function(_this) {
            return function() {
                return that.removeEvent();    //this is called if the user clicks on the confirmbutton
                //return $(_this).parent().remove();
            };
        })(this));
    },

    showModal: function(message, options) {
        var cleanup, component, props, wrapper;
        if (options == null) {
            options = {};
        }
        props = $.extend({
            message: message
        }, options);
        wrapper = document.body.appendChild(document.createElement("div"));
        component = reactDom.render(<Confirm {...props}/>, wrapper);
        cleanup = function() {
            reactDom.unmountComponentAtNode(wrapper);
            return setTimeout(function() {
                return wrapper.remove();
            });
        };
        return component.promise.always(cleanup).promise();
    },

    removeEvent: function(){
        var that = this;
        var eventToRemove = this.state.event;
        var success = function(){
            that.props.getEvents();
            browserHistory.push('/');
            msgComponent.showMessageComponent('Event ' + that.state.event.name + ' deleted', SHOW_MSG_SEC * 1000, 'success')
        }
        var error = function( jqXhr, textStatus, errorThrown ){
            browserHistory.push('/');
            msgComponent.showMessageComponent('Failed to remove the event. Please try again and report the error if it persists', SHOW_MSG_SEC * 1000, 'error')
            console.log( errorThrown );
        }
        UTILS.rest.removeEntry('event', this.state.event.id, success, error);
    },

    createEditButton: function() {
        var tokens = UTILS.helper.getUrlTokens();
        var eventId = tokens[tokens.length - 1];
        return <div className="btn btn-default btn-block" onClick={this.moveToEditForm}>EDIT</div>
    },

    moveToEditForm: function(){
        var tokens = UTILS.helper.getUrlTokens();
        var eventId = tokens[tokens.length - 1];
        browserHistory.push("/events/" + eventId + "/edit")
    },

    handleChange: function(key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },

    cancelAttendance: function(){
        console.log("canceling attendance not supported yet")
    },

    redirectToAttendForm: function(){
        var tokens = UTILS.helper.getUrlTokens();
        var eventId = tokens[tokens.length - 1];
        browserHistory.push("/join/" + eventId);
    },

    render: function(){
        var that = this;

        //cannot use variable name event here because we need to refer to something else with event in the format
        var eventVar = this.state.event
        
        var eventName;
        var date;
        var time;
        var address;
        var btn;
        var peopleAttending = 0;
        var participantList;
        var category;
        var peopleAttendingStr;
        var description;

        if(eventVar == null){
            eventName = "Unnamed event";
            date = "---";
            time = "---";
        } else {
            eventName = eventVar.name;
            date = Moment.unix(eventVar.timestamp/1000).format("ddd DD.MM.YYYY");
            time = Moment.unix(eventVar.timestamp/1000).format("HH:mm");


            if(typeof eventVar.Address === 'undefined') {
                address = <div></div>
            } else {

                var addressComponents = [];
                if(!commonUtils.isEmpty(eventVar.Address.streetAddress)) {
                    addressComponents.push(eventVar.Address.streetAddress);
                }
                if(!commonUtils.isEmpty(eventVar.Address.zipCode)) {
                    if(!arrayContainsString(addressComponents, eventVar.Address.zipCode)) {
                        addressComponents.push(eventVar.Address.zipCode);
                    }
                }
                if(!commonUtils.isEmpty(eventVar.Address.city)) {
                    if(!arrayContainsString(addressComponents, eventVar.Address.city)) {
                        addressComponents.push(eventVar.Address.city);
                    }
                }
                if(!commonUtils.isEmpty(eventVar.Address.country)) {
                    if(!arrayContainsString(addressComponents, eventVar.Address.country)) {
                        addressComponents.push(eventVar.Address.country);
                    }

                }
                var addressStr = addressComponents.join(", ");
                address = <div>{addressStr}</div>

                function arrayContainsString(stringArray, searchStr) {
                    for(var str in stringArray) {
                        if(stringArray[str].indexOf(searchStr) > -1) {
                            return true;
                        }
                    }
                    return false;
                }
            }


            if(typeof eventVar.Attendances !== 'undefined') {

                 peopleAttending = eventVar.Attendances.length
            }

            if(typeof eventVar.Category == 'undefined') {
                category = <div></div>
            } else {
                category = <div>Category: {eventVar.Category.name}</div>

            }

            if(peopleAttending > 0) {
                peopleAttendingStr = peopleAttending + " people attending"
            }

            //var descriptionField = "<span></span>";
        //    var descriptionField = document.createElement("span");

           // var descriptionField = "";
            if(!commonUtils.isEmpty(eventVar.description)) {

                function escape(text) {
                    var div = document.createElement("div");
                    div.appendChild(document.createTextNode(text));
                    return div.innerHTML;
                }

                var description = escape(eventVar.description);
                description = escape(description);
                description = description.replace(/\n\r?/g, '<br />');
                $("#description").html(description);
            }
        }


        //let popover = <Popover title="popover">very popover. such engagement</Popover>;

        var user = this.props.getAppStatus('user')
        if( this.state.loginStatusPending || this.state.event === null || this.state.fetchingAttendees){
            return (
                <h2 className="eventPageContainer centeredVertHor">loading...</h2>
            )
        }

        var joinBtnText = ''
        if( this.state.userAttending ){
            joinBtnText = "My attendance"
        }else{
            joinBtnText = "Join"
        }
        var counter = 0;

        return (
            <div id="eventPageContainer">
                <div>
                    <h3>{eventName} <button className="pull-right btn btn-primary btn-sm" onClick={this.redirectToAttendForm}>{joinBtnText}</button></h3>
                    {date}<br/>
                    {time}<br/>
                    {address}
                    {category}
                    {peopleAttendingStr}<br/>
                    <span id="description"></span><br/>
                </div>
                {this.state.attendees.length > 0 ?
                    <div>
                        <h3>Who is attending?</h3>
                        {this.state.attendees.map(attendee =>
                            <div className="row" key={counter++}>
                                <div className="col-xs-6">
                                    {attendee.username}
                                </div>
                                <div className="col-xs-6">
                                    {attendee['Attendances.comment']}
                                </div>   
                            </div>
                        )}
                    </div>
                    :
                    ''
                }
  
            </div>
        )
    }

});

module.exports = EventPage;

/*


                    <Modal bsSize='small' show={this.state.showModal} onHide={this.close}>
                      <Modal.Header closeButton>
                        <Modal.Title>People attending in {eventVar.name}</Modal.Title>
                      </Modal.Header>
                          <Modal.Body>
                                {typeof eventVar.Attendances !== 'undefined' ? eventVar.Attendances.map(function(attendance, index){
                                    return <div>
                                        <OverlayTrigger overlay={<Popover title={attendance.name}>{attendance.comment}</Popover>}>
                                        <a href="#">{attendance.name}</a></OverlayTrigger>
                                   </div>
                                  }) : ''}
                          </Modal.Body>
                    </Modal>

                    */