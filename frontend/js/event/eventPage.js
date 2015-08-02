var React = require('react');
var utils = require('../utils.js');
var Map = require('../map.js');
var URL = require('../url.js');
var Moment = require('moment');
var Underscore = require('underscore.string')

var EventPage = React.createClass({


	getInitialState: function() {

		return {
			event: []
		};

	},
	componentWillMount: function() {
	},

	componentDidMount: function() {
		var that = this;
		var tokens = utils.urlTokens();
		var eventId = tokens[tokens.length - 1];
		var url = URL.REST + '/events/' + eventId
		console.log("url: " + url) 

	/*	$.get(url, function(result){
			if(this.isMounted()){
				this.setState({
					event: result
				});
			}
		}.bind(this));*/

$.ajax({ 
	type: 'GET', 
	url: url,
	dataType: 'json',
	success: function (data) { 
		if(that.isMounted()){
			that.setState({
				event: data
			})
		}
	}
});

},

handleSubmit: function(e) {
	var that = this;
	var event = this.state.event;
	console.log("name: " + this.state.event.name)
	e.preventDefault();
	var data = {
		attendeeName: this.state.attendeeName,
		email: this.state.email,
		comment: this.state.comment,
		event: event
	}
	
	$.ajax({
	    type: 'POST',
	    dataType: 'json',
	    url: URL.attendance,
	    data: JSON.stringify(data),
	    contentType: "application/json; charset=utf-8",
	    //contentType: 'application/x-www-form-urlencoded',
	    success: function(){
	       // that.transitionTo('home');
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

		var event = this.state.event
		var date = Moment.unix(event.timestamp/1000).format("ddd DD.MM.YYYY");
		var time = Moment.unix(event.timestamp/1000).format("HH:mm")
		//console.log("type: " + typeof event.address)

		var address;

		if(typeof event.Address === 'undefined'){
			address = <div></div>
		}else{
			var addressStr = '';

			if(!Underscore.isBlank(event.Address.streetAddress)){
				addressStr = event.Address.streetAddress + ", "
			}
			if(!Underscore.isBlank(event.Address.zipCode)){
				addressStr += event.Address.zipCode + ", "
			}
			if(!Underscore.isBlank(event.Address.city)){
				addressStr += event.Address.city + ", "
			}
			if(!Underscore.isBlank(event.Address.country)){
				addressStr += event.Address.country
			}
			addressStr = Underscore.trim(addressStr, ", ")

			address = <div><b>Address:</b> {addressStr}</div>

			console.log('-----------------')
			console.log(address)

		}

		return (
			<div>
				<div id='leftPane' className='col-xs-12 col-md-6'>
					<h1>{event.name}</h1>
					<b>Date:</b> {date}<br/>
					<b>Time:</b> {time}<br/>
					<b>Description:</b> {event.description}
					{address}
				</div>
				<div id='rightPane' className='col-xs-12 col-md-6'>
					<h1>Attend the event</h1>
					<form className='form' role='form' onSubmit={ this.handleSubmit }>
						<div className='form-group'>
							<input type='text' value={this.state.attendeeName} onChange={this.handleChange('attendeeName')} className='form-control' id='attendeeName' placeholder='Your name'/>
						</div>
						<div className='form-group'>
							<input type='text' value={this.state.email} onChange={this.handleChange('email')} className='form-control' id='email' placeholder='Email address'/>
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