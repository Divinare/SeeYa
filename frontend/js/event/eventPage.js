var React = require('react');
var Router = require('react-router');
var Moment = require('moment');
var Underscore = require('underscore.string')
var validator = require('bootstrap-validator')
var rBootstrap = require('react-bootstrap')
var Modal = rBootstrap.Modal
var Button = rBootstrap.Button
var OverlayTrigger = rBootstrap.OverlayTrigger
var Popover = rBootstrap.Popover
var Tooltip = rBootstrap.Tooltip
$ = window.jQuery = require('jquery');


var EventPage = React.createClass({
    mixins: [ Router.Navigation ],

    getInitialState: function() {           
            
        return {
            event: [],
             showModal: false
        };

    },
  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },


    componentWillMount: function() {
        
    },

    componentDidMount: function() {
        this.props.handleResize();
        var that = this;
        $('#form').validator()
        $('#form').validator().on('submit', function (e) {
            if (e.isDefaultPrevented()) {
             } else {
                e.preventDefault();
                that.addAttendance();

             }
        })
        var tokens = UTILS.helper.getUrlTokens();
        var eventId = tokens[tokens.length - 1];

        var onSuccess = function (data) {
            console.log("DATA:::");
            console.log(data);
            if(that.isMounted()){
                that.setState({
                    event: data
                })
            }
        };
        var onError = function() {
            console.log("Error on fetching event!");
        }
        UTILS.rest.getEntry('event', eventId, onSuccess, onError);

    },

addAttendance: function(e) {
    console.log("submitting...")
    var that = this;
    var event = this.state.event;
    console.log("name: " + this.state.event.name)
    var data = {
        name: this.state.name,
        email: this.state.email,
        comment: this.state.comment,
        event: event
    }
    var success = function(){
        that.props.getEvents();
        that.transitionTo('home');
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
                //that.props.removeEventFromFilteredEventList(eventToRemove)
                that.transitionTo('home');
        }
        var error = function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        UTILS.rest.removeEntry('event', this.state.event.id, success, error);   
    }
},

handleEdit: function(){
    var tokens = UTILS.helper.getUrlTokens();
    var eventId = tokens[tokens.length - 1];

    var params = {
        edit: true,
        streetAddress: this.state.event.Address.streetAddress,
        event: this.state.event
    }
    this.transitionTo('eventEdit', {id: eventId}, params);
},

handleChange: function(key) {
    return function (e) {
        var state = {};
        state[key] = e.target.value;
        this.setState(state);
    }.bind(this);
},


render: function(){
        //console.log("result: " + utils.urlTokens())
        //cannot use variable name event here because we need to refer to something else with event in the format
        var eventVar = this.state.event
        var date = Moment.unix(eventVar.timestamp/1000).format("ddd DD.MM.YYYY");
        var time = Moment.unix(eventVar.timestamp/1000).format("HH:mm")

        //console.log("type: " + typeof event.address)

        var address;

        if(typeof eventVar.Address === 'undefined'){
            address = <div></div>
        } else{
            var addressStr = '';

            if(!Underscore.isBlank(eventVar.Address.streetAddress)){
                addressStr = eventVar.Address.streetAddress + ", "
            }
            if(!Underscore.isBlank(eventVar.Address.zipCode)){
                addressStr += eventVar.Address.zipCode + ", "
            }
            if(!Underscore.isBlank(eventVar.Address.city)){
                addressStr += eventVar.Address.city + ", "
            }
            if(!Underscore.isBlank(eventVar.Address.country)){
                addressStr += eventVar.Address.country
            }
            addressStr = Underscore.trim(addressStr, ", ")

            address = <div>{addressStr}</div>

        }
        var that = this;

/*          <ul>
                        {eventVar.Attendances.map(function(attendance){
                            return <li>{attendance.name}</li>;
                          })}
                    </ul>*/
    let popover = <Popover title="popover">very popover. such engagement</Popover>;

    var btn
    var peopleAttending = 0
    var participantList
    if(typeof eventVar.Attendances !== 'undefined'){
        btn = <Button
              bsStyle="default"
              onClick={this.open}>
              Show participants
            </Button>

         peopleAttending = eventVar.Attendances.length
    }

    var peopleAttendingStr
    if(peopleAttending > 0){
        peopleAttendingStr = peopleAttending + " people"
    }

    var description

    if(!Underscore.isBlank(eventVar.description)){
        description = eventVar.description
    }else{
        description = ''
    }

    return (
        <div className='right-container'>
            <div>
                <h1>{eventVar.name}</h1>
                {date}<br/>
                {time}<br/>
                {address}
                {peopleAttendingStr}<br/>
                {description}<br/>

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

            
                <div className="btn-group">
                    <button className="btn btn-default" onClick={that.handleEdit}>Edit</button>
                    { peopleAttending > 0 ? btn : ''}
                    <button className="btn btn-danger" onClick={that.handleRemove}>Delete</button>
                </div>

            </div>
            <div >
                <h1>Attend {event.name}</h1>
                <form className='form' id='form' role='form' data-toggle="validator" data-disable="false" onSubmit={event.preventDefault()}>
                    <div className='form-group required'>
                        <input type='text' value={this.state.name} onChange={this.handleChange('name')} className='form-control' id='name' placeholder='Your name' required/>
                        <div className="help-block with-errors"></div>
                    </div>
                    <div className='form-group'>
                        <input type='text' pattern="^\S+@\S+\.\S+$" value={this.state.email} onChange={this.handleChange('email')} className='form-control' id='email' placeholder='Email address'/>
                        <div className="help-block with-errors"></div>
                    </div>
                    <div className='form-group'>
                        <textArea type='text' value={this.state.description} onChange={this.handleChange('comment')} className='form-control' id='comment' placeholder='Comment'/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-default" type="submit">Attend</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

});

module.exports = EventPage;