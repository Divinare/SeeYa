var React = require('react');
var Router = require('react-router');
var DatePicker = require('react-datepicker');
var Select = require('react-select');
var Moment = require('moment')
//var $ = require('jquery-autocomplete-js');


var URL = require('../url.js');
var clock24hour = require('../utils/clocktimes.js').hour24;

var EventForm = React.createClass({
	mixins: [ Router.Navigation ],

    getInitialState: function() {
	    return {

	    };
	},
	componentWillMount: function() {

	},

	componentDidMount: function() {

	},

    handleNewDateChange: function(moment) {
    	
    	//var d = moment.format('MM-DD-YYYY'))
	   // console.log(moment.format('MM-DD-YYYY'));
	    this.setState({
	        date: moment
	    });

    },

	handleTimeChange: function(e){
		console.log("???");
		console.log(e)
		console.log(e.target.value);
		this.setState({time: e.target.value})
	},

	handleSubmit: function(e) {
		var that = this;
		e.preventDefault();
		console.log("add " + this.state.address);
		var address = {
			streetAddress: this.state.address,
			country: 'helsinki',
			zipCode: "00100",
		}
		console.log(address);
		console.log("asd");
		console.log("time: " + this.state.time);
		console.log(address.streetAddress);
		console.log("date: " + this.state.date.format('YYYY-MM-DD HH:mm'));
		
		console.log(this.state)

		var moment = this.state.date
		var hours = parseInt(this.state.time.substring(0, 2))
		console.log("hours: " + hours)
		var minutes = parseInt(this.state.time.substring(3, 5))
		console.log("minutes: " + minutes)

		moment.minutes(minutes)
		moment.hours(hours)

		console.log("date with added time: "  + moment.format('YYYY-MM-DD HH:mm'))

		var timedate = Date.parse(this.state.time)
		console.log("timedate: " + timedate)

		console.log("unix moment: " + moment.unix())


		var data = {
			name: this.state.name,
			address: address,
			description: this.state.description,
			timestamp: moment.unix()*1000,
			lat: 66.102,
			lon: 27.123
			//time: this.state.time,
		};
		console.log(data);
		
		$.ajax({
		    type: 'POST',
		    dataType: 'json',
		    url: URL.allEvents,
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
       return function (e) {
	       var state = {};
	       state[key] = e.target.value;
	       this.setState(state);
       }.bind(this);
    },

	setCurrentTime: function() {
		var str = Moment().format('HH:mm');
		$('#time').val(str);
		this.setState({time: str})
	},

	render: function(){
		return (
			<div id="eventForm">
				<div id='leftPane' className='col-xs-0 col-md-3'>
				</div>
				<div id='centerPane' className='col-xs-12 col-md-6'>

					<h1 className="text-center">Create new event</h1>
					<form className='form' role='form' onSubmit={ this.handleSubmit }>
						<div className='form-group'>
							<input type='text' value={this.state.name} onChange={this.handleChange('name')} className='form-control' id='name' placeholder='Event name'/>
						</div>

						<div className='form-group'>
							<div className='input-group'>
								<input type='text' value={this.state.address} onChange={this.handleChange('address')} className='form-control' id='address' placeholder='Address'/>
								<span className="input-group-btn">
									 <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
								</span>
							</div>
						</div>

						<div className='form-group'>
							<div className="input-group full-width">
					          <DatePicker
					          	selected={this.state.date}
						        key="example3"
						        onChange={this.handleNewDateChange}
						        placeholderText="Date: dd:mm:yyyy"
						      />
					        </div>
						</div>

						<div className='form-group'>
							<div className='input-group'>
								<input type='text' value={this.state.time} onChange={this.handleTimeChange} className='form-control' id='time' placeholder="Time: hh:mm"/>
								<span className="input-group-btn">
									 <button className="btn btn-default" onClick={this.setCurrentTime} type="button"><i className="glyphicon glyphicon-time"></i></button>
								</span>
							</div>
						</div>

						<div className='form-group'>
							<textArea type='text' value={this.state.description} onChange={this.handleChange('description')} className='form-control' id='description' placeholder='Description'/>
						</div>
						<div className="form-group">

				            <button className="btn btn-default" type="submit">Submit</button>
					    </div>
					
					 </form>

				</div>
				<div id='rightPane' className='col-xs-0 col-md-3'>
				</div>
			</div>
		)
	}

});

module.exports = EventForm;

//FORM WITH LABELS
/*
			<div id="eventForm">
				<div id='leftPane' className='col-xs-0 col-md-3'>
				</div>
				<div id='centerPane' className='col-xs-12 col-md-6'>

					<h1 className="centeredHeader">Create new event</h1>
					<form className='form' role='form'>
						<div className='form-group'>
							<label for='name'>Name</label>
							<input type='text' className='form-control' id='name'/>
						</div>

						<div className='form-group'>
							<label for='address'>Address</label>
							<div className='input-group'>
								<input type='text' className='form-control' id='address'/>
								<span className="input-group-btn">
									 <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
								</span>
							</div>
						</div>

						<div className='form-group'>
							<label for='date'>Date</label>
							<div className="input-group">
					          <DatePicker
						        key="example3"
						        selected={this.state.new_date}
						        onChange={this.handleNewDateChange}
						        placeholderText="Date: dd:mm:yyyy"
						      />
					        </div>
						</div>

						<div className='form-group'>
							<label for='time'>Time</label>
							<div className='input-group'>
								<input type='text' className='form-control' id='time' placeholder="hh:mm"/>
								<span className="input-group-btn">
									 <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-time"></i></button>
								</span>
							</div>
						</div>

						<div className='form-group'>
							<label for='description'>Description</label>
							<input type='text' className='form-control' id='description'/>
						</div>
						<div className="form-group">

				            <button type="submit" className="btn btn-default">Submit</button>
					    </div>
					
					 </form>
				</div>
				<div id='rightPane' className='col-xs-0 col-md-3'>
				</div>
			</div>*/