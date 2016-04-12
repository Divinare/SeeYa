var React = require('react');
var Router = require('react-router');
var Moment = require('moment');
var _ = require('lodash');
var validator = require('bootstrap-validator');

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
            if( !this.state.loginStatusPending ){
                this.updateUserAttendingInfo();
            } 
        }

        if( prevState.loginStatusPending && !this.state.loginStatusPending ){    //login status updated
            if( !this.state.fetchingAttendees ){
                this.updateUserAttendingInfo();
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
        console.log("ATTENDEES")
        console.log(this.state.attendees)
        console.log("logged in user")
        console.log(loggedInUser)
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

    componentDidMount: function() {
        var tokens = UTILS.helper.getUrlTokens();
        var eventId = tokens[tokens.length - 1];
        this.props.handleResize();
        this.fetchEvent(eventId);
        this.checkIfUserLoggedIn();
        this.fetchAttendees(eventId);

    },

    fetchEvent: function(eventId){
        var that = this;
        var onSuccess = function (data) {
            if(that.isMounted()){
                that.setState({
                    event: data
                })
                that.updateEditingPrivileges(data);
            }
        };

        var onError = function() {
            console.log("Error on fetching event!");
            browserHistory.push('/');   //TODO ADD NOTIFICATION TO THE USER SAYING THE EVENT WAS NOT FOUND
        }
        UTILS.rest.getEntry('event', eventId, onSuccess, onError);
    },

    checkIfUserLoggedIn: function(){
        var that = this;
        var success = function(result) {
            if(that.isMounted()){
                that.props.updateAppStatus('user', result.user);
                that.setState({
                    loginStatusPending: false
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

    handleRemove: function(){
        var that = this;
        var deleteConfirmed = confirm("Are you sure you want to delete the event?")

        var eventToRemove = this.state.event;
        if(deleteConfirmed){
            var success = function(){
                that.props.getEvents();
                browserHistory.push('/');
            }
            var error = function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
            UTILS.rest.removeEntry('event', this.state.event.id, success, error);   
        }
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


            if(typeof eventVar.Address === 'undefined'){
                address = <div></div>
            } else{
                var addressStr = '';

                if(!_.isEmpty(eventVar.Address.streetAddress)){
                    addressStr = eventVar.Address.streetAddress + ", "
                }
                if(!_.isEmpty(eventVar.Address.zipCode)){
                    addressStr += eventVar.Address.zipCode + ", "
                }
                if(!_.isEmpty(eventVar.Address.city)){
                    addressStr += eventVar.Address.city + ", "
                }
                if(!_.isEmpty(eventVar.Address.country)){
                    addressStr += eventVar.Address.country
                }
                addressStr = _.trim(addressStr, ",");
                address = <div>{addressStr}</div>

            }


            if(typeof eventVar.Attendances !== 'undefined'){
                /*
                react-bootstrap removed:

                btn = <Button
                      bsStyle="default"
                      onClick={this.open}>
                      Show participants
                    </Button>
                    */

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
            if(!_.isEmpty(eventVar.description)) {

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
            <div>
                <div>
                    <h3>{eventName} <button className="pull-right btn btn-primary btn-sm" onClick={this.redirectToAttendForm}>{joinBtnText}</button></h3>
                    {date}<br/>
                    {time}<br/>
                    {address}
                    {category}
                    {peopleAttendingStr}<br/>
                    <span id="description"></span><br/>

                    <div>modal was here T. joe</div>

                    <br />
                    { that.state.editingAllowed ? 
                        <div>
                            {this.createEditButton()}
                            { peopleAttending > 0 ? btn : ''}
                            <button className="btn btn-danger btn-block" onClick={that.handleRemove}>Delete</button>
                        </div> 
                        :
                        ''
                    }

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