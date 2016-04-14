import { browserHistory, Link } from 'react-router';
var React = require('react');
var validator = require('../../../common/validators/validator.js');
var utils = require('../../../common/utils.js');
var msgComponent = require('../utils/messageComponent.js');
const SHOW_MSG_SEC = 5;

const AttendForm = React.createClass({

    getInitialState: function() {   
        return {
             event: null,
             showModal: false,
             fetchingAttendees: true,
             attendees: [],
             userAttending: null,    //tells if the user is attending this event already or not
             comment: null
        };
    },

    componentDidUpdate: function(prevProps, prevState) {
        if( prevState.fetchingAttendees && !this.state.fetchingAttendees ){  //we got the attendees now
            if( !this.state.loginStatusPending ){
                this.updateUserAttendingInfo();
            } 
        }
    },

    //only call this method when attendances have been fetched
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
        this.setState({
            userAttending: attending
        })
    },

    componentDidMount: function(){
        this.props.handleResize();
        this.setState({
            fetchingAttendees: true
        })
        var tokens = UTILS.helper.getUrlTokens();
        var eventId = tokens[tokens.length - 1];
        this.fetchEvent(eventId);
        this.fetchAttendees(eventId);
    },

    fetchEvent: function(eventId){
        var that = this;
        var onSuccess = function (data) {
            if(that.isMounted()){
                that.setState({
                    event: data
                })
            }
        };

        var onError = function() {
            console.log("Error on fetching event!");
            browserHistory.push('/');   //TODO ADD NOTIFICATION TO THE USER SAYING THE EVENT WAS NOT FOUND
        }
        UTILS.rest.getEntry('event', eventId, onSuccess, onError);
    },

   fetchAttendees: function(eventId){
        var that = this;
        var success = function(result) {
            var attendees = [];
            if( result != null && result.users != null){
                attendees = result.users;
            }
            that.setState({
                fetchingAttendees: false,
                attendees: attendees
            })
        }
        var error = function(jqXhr, textStatus, errorThrown){
            console.log(errorThrown)
            that.setState({
                fetchingAttendees: false,
            })
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
            if(that.state.userAttending){
                msgComponent.showMessageComponent('Comment updated', SHOW_MSG_SEC * 1000, 'success')
            }else{
                msgComponent.showMessageComponent('Successfully joined ' + that.state.event.name, SHOW_MSG_SEC * 1000, 'success')
            }
            browserHistory.push('/events/' + that.state.event.id); 
        };              
        var error = function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        };
        UTILS.rest.addEntry('attendance', data, success, error);
    },

    removeAttendance: function(){
        var that = this;
            
        var success = function(){
            msgComponent.showMessageComponent('Attendance canceled for ' + that.state.event.name, SHOW_MSG_SEC * 1000, 'success')
            that.props.getEvents();
            browserHistory.push('/events/' + that.state.event.id);
        };   

        var error = function( jqXhr, textStatus, errorThrown ){
            msgComponent.showMessageComponent('Failed to remove the attendance. This looks like an error in the website. Please take a minute and report it, so we can improve your experience in the future', SHOW_MSG_SEC * 1000, 'error')
        }
        UTILS.rest.removeEntry('attendance', this.state.event.id, success, error);
    },

    handleChange: function(key) {
        return function (e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },

    render: function(){
        if(this.state.fetchingAttendees || this.state.event === null){
            return (
                <h2 className="centeredVertHor">Loading...</h2>
            )
        }
        return(
            <div id="attendFormContainer">
                 { ( this.props.user !== null ) ? 
                        <div >
                            { ( this.state.userAttending === true ) ?
                                <h2>You have joined {this.state.event.name}</h2>
                                :
                                <h2>Attend {this.state.event.name}</h2>
                            }
                            <form className='form' id='form' role='form' data-toggle="validator" data-disable="false"> 
                                <div className='form-group'>
                                    <textArea type='text' value={this.state.comment} onChange={this.handleChange('comment')} className='form-control' id='comment' placeholder='Optional comment'/>
                                </div>
                                <div className="form-group">
                                    { ( this.state.userAttending === false ) ?

                                        <button className="btn btn-default btn-block" type="button" onClick={this.addAttendance}>Attend</button>
                                    :
                                        <div className = "input-group-btn">
                                            <button className="btn btn-default btn-block" type="button" onClick={this.addAttendance}>Update comment</button>
                                            <button className="btn btn-danger btn-block" type="button" onClick={this.removeAttendance}>Cannot go</button>
                                        </div>
                                    }
                                </div>

                            </form>
                        </div> 
                    :
                        <div>
                            <br/>
                            <div><Link to={"/login/"}>Log in</Link> or <Link to={"/signup/"}>sign up</Link> to attend </div>
                        </div>
                    }

                    <Link to={"/events/" + this.state.event.id} className="btn btn-primary">
                        <span className="glyphicon glyphicon-chevron-left"></span> Back
                    </Link>
     
            </div>
        )

    }
});

module.exports = AttendForm;


/*



                    */
