var React = require('react');
var Router = require('react-router');
var Moment = require('moment');
var Underscore = require('underscore.string')
var validator = require('bootstrap-validator')

var EventPage = React.createClass({
	mixins: [ Router.Navigation ],

	getInitialState: function() {

		return {
			event: []
		};

	},
	componentWillMount: function() {
	},

	componentDidMount: function() {
		var that = this;
		$('#form').validator()
		$('#form').validator().on('submit', function (e) {
	  		if (e.isDefaultPrevented()) {
	   			console.log("invalid form");
	 		 } else {
	 		 	console.log("moroooooo")
	 		 	e.preventDefault();
	 		 	that.handleSubmit();

			 }
		})
		var tokens = UTILS.helper.getUrlTokens();
		var eventId = tokens[tokens.length - 1];
		var url = REST.event + eventId

		var onSuccess = function (data) { 
			if(that.isMounted()){
				that.setState({
					event: data
				})
			}
		};
		UTILS.rest.getEvent(url, onSuccess);
	},

handleSubmit: function(e) {
	console.log("submitting...")
	var that = this;
	var event = this.state.event;
	console.log("name: " + this.state.event.name)
	var data = {
		attendeeName: this.state.attendeeName,
		email: this.state.email,
		comment: this.state.comment,
		event: event
	}
	
	$.ajax({
	    type: 'POST',
	    dataType: 'json',
	    url: REST.attendance,
	    data: JSON.stringify(data),
	    contentType: "application/json; charset=utf-8",
	    //contentType: 'application/x-www-form-urlencoded',
	    success: function(){
	        that.transitionTo('home');
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	})

},

handleChange: function(key) {
	console.log("handle change")
	console.log(this.state.attendeeName)
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

			address = <div><b>Address:</b> {addressStr}</div>

			console.log('-----------------')
			console.log(address)

		}

		return (
			<div>
				<div id='leftPane' className='col-xs-12 col-md-6'>
					<h1>{eventVar.name}</h1>
					<b>Date:</b> {date}<br/>
					<b>Time:</b> {time}<br/>
					<b>Description:</b> {eventVar.description}
					{address}
				</div>
				<div id='rightPane' className='col-xs-12 col-md-6'>
					<h1>Attend the event</h1>
					<form className='form' id='form' role='form' data-toggle="validator" data-disable="false" onSubmit={event.preventDefault()}>
						<div className='form-group required'>
							<input type='text' value={this.state.attendeeName} onChange={this.handleChange('attendeeName')} className='form-control' id='attendeeName' placeholder='Your name' required/>
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