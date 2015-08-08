var React = require('react');
var Router = require('react-router');
var DatePicker = require('react-datepicker');
var Select = require('react-select');
var Moment = require('moment')
var validator = require('bootstrap-validator')
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
		console.log("mounted")
		this.state.dateFieldClicked = false
		document.querySelectorAll(".datepicker__input")[0].addEventListener('onblur', this.handleOnBlur());
	},

    handleNewDateChange: function(moment) {
    	showValidationInfoForDatePicker();
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

	removeRedBorderFromInput: function(elem){
		console.log("classnames: " + elem.className)
		elem.className = 'datepicker__input'
		console.log("classnames: " + elem.className)
	},

	addRedBorderToInput: function(elem){
		console.log("AAaaaaaaaaaaaaaaaaaaaaaa")
		elem.className += " red-border"
	},

	handleSubmit: function(e) {
		if(showValidationInfoForDatePicker()){
			this.addRedBorderToInput(document.querySelectorAll(".datepicker__input")[0])
		}else{
			this.removeRedBorderFromInput(document.querySelectorAll(".datepicker__input")[0])
			var that = this;
			e.preventDefault();
			console.log("add " + this.state.address);
			var address = {
				streetAddress: this.state.address,
				country: 'helsinki',
				zipCode: "00100",
			}

			var moment = this.state.date
			var hours = parseInt(this.state.time.substring(0, 2))
			var minutes = parseInt(this.state.time.substring(3, 5))

			moment.minutes(minutes)
			moment.hours(hours)

			var timedate = Date.parse(this.state.time)


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
		}
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

	handleOnBlur: function(date){
		console.log("onblur")
		if(this.state.dateFieldClicked){
			this.showValidationInfoForDatePicker();
		}

		this.state.dateFieldClicked = true;
	},


	showValidationInfoForDatePicker: function(){	//returns true if the field is filled
		var dateField = document.querySelectorAll(".datepicker__input")[0];
		if(typeof this.state.date == 'undefined'){
			this.addRedBorderToInput(dateField)
			return false;
		}
		return true;
	},



	setRedBorder: function(){
		this.addRedBorderToInput(document.querySelectorAll(".datepicker__input")[0])
	},

	removeRedBorder: function(){
		this.removeRedBorderFromInput(document.querySelectorAll(".datepicker__input")[0])
	},

	render: function(){
		return (
			<div id="eventForm">
				<div id='leftPane' className='col-xs-0 col-md-3'>
				</div>
				<div id='centerPane' className='col-xs-12 col-md-6'>

					<h1 className="text-center">Create new event</h1>
					<form id='form' className='form' data-toggle="validator" data-disable="false" role='form' onSubmit={ this.handleSubmit }>
						<div className='form-group required'>
							<div>
								<input type='text' value={this.state.name} onChange={this.handleChange('name')} className='test form-control' id='name' placeholder='Event name' required/>
							</div>
							<span className="help-block with-errors"></span>
						</div>

						<div className='form-group required'>
							<div className='input-group'>
								<input type='text' data-minlength="6" value={this.state.address} onChange={this.handleChange('address')} className='form-control' id='address' placeholder='Address' required/>
								<span className="input-group-btn">
									 <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
								</span>
							</div>
						</div>

						<div className='form-group required'>
							<div className="input-group full-width">
					          <DatePicker
					          	selected={this.state.date}
					          	dateFormat= 'DD.MM.YYYY'
						        key="example3"
						        onChange={this.handleNewDateChange}
						        placeholderText="Date: dd:mm:yyyy"
						        onBlur={this.handleOnBlur} />
					        </div>
						</div>

						<div className='form-group required'>
							<div className='input-group'>
								<input type='text'  pattern="^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"  value={this.state.time} onChange={this.handleTimeChange} className='form-control' id='time' placeholder="Time: hh:mm" required/>
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