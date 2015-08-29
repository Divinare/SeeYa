var React = require('react');
var Router = require('react-router');
var DatePicker = require('react-datepicker');
var Select = require('react-select');
var Moment = require('moment')
var validator = require('bootstrap-validator')
//var $ = require('jquery-autocomplete-js');

var EventForm = React.createClass({
	mixins: [ Router.Navigation ],

    getInitialState: function() {
	    return {
	    };
	},
	componentWillMount: function() {

	},

	componentDidMount: function() {

		this.props.handleResize();
		var that = this;
		$('#form').validator()

		$('#form').validator().on('submit', function (e) {
			if(!that.showValidationInfoForDatePicker()){
				e.preventDefault();
				//console.log("default prevented")
			}
	  		if (e.isDefaultPrevented()) {
	   			//console.log("invalid form");
	 		 } else {
	 		 	e.preventDefault();
	 		 	that.handleSubmit();
			 }
		})
		this.state.dateFieldClicked = false
		var dateInput = document.querySelectorAll(".datepicker__input")[0]
		dateInput.setAttribute("data-validateDate", this.validateDate)
		dateInput.addEventListener('blur', this.handleOnBlur);
		this.hideRedBorderAndErrorText(dateInput, document.getElementById('errorDivForDateField'));
	},

	validateDate: function(date){
		console.log("validating date...")
	},

    handleNewDateChange: function(moment) {
    	//var d = moment.format('MM-DD-YYYY'))
	   // console.log(moment.format('MM-DD-YYYY'));
	    this.setState({
	        date: moment
	    });
	    this.showValidationInfoForDatePicker(moment);

    },

	handleTimeChange: function(e){
		this.setState({time: e.target.value})
	},

	handleSubmit: function(e) {
		var that = this;
		//e.preventDefault();
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

		var latLng = UTILS.helper.getLatLon(this.props.newEventMarker);

		var data = {
			name: this.state.name,
			address: address,
			description: this.state.description,
			timestamp: moment.unix()*1000,
			lat: latLng[0],
			lon: latLng[1]
			//time: this.state.time,
		};
		console.log("New event created:");
		console.log(data);


		
		$.ajax({
		    type: 'POST',
		    dataType: 'json',
		    url: REST.allEvents,
		    data: JSON.stringify(data),
		    contentType: "application/json; charset=utf-8",
		    //contentType: 'application/x-www-form-urlencoded',
		    success: function(createdEventData){
		    	console.log("Address:");
		    	console.log(address);

		    	// Adding the missing fields of the created event:
		    	createdEventData.Address = address;
		    	createdEventData.Attendances = [];
		    	console.log("adding");
		    	console.log(createdEventData);

		    	var newEventMarker = that.props.newEventMarker;
		    	newEventMarker.setMap(null);
		    	that.props.updateAppStatus('newEventMarker', {});
		    	//that.props.deleteNewEventMarker();
		    	that.props.addEventToFilteredEventList(createdEventData);
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
		$('#time').blur();
	},

	handleOnBlur: function(date){
		if(this.state.dateFieldClicked){
			this.showValidationInfoForDatePicker();
		}

		this.state.dateFieldClicked = true;
	},


	showValidationInfoForDatePicker: function(moment){	//returns true if the field is filled
		if(moment == null){
			moment = this.state.date
		}
		var dateField = document.querySelectorAll(".datepicker__input")[0];
		if(typeof moment == 'undefined' || moment == null){
			this.showRedBorderAndErrorText(dateField, document.getElementById('errorDivForDateField'))
			return false;
		}
		this.hideRedBorderAndErrorText(dateField, document.getElementById('errorDivForDateField'))
		return true;
	},

	hideRedBorderAndErrorText: function(elem, errorDiv){
		elem.className = 'datepicker__input'
		errorDiv.style.display = 'none';
	},

	showRedBorderAndErrorText: function(elem, errorDiv){
		elem.className += " red-border"
		errorDiv.style.display = 'block';
	},

	searchByAddress: function(address){
		console.log("search by address called!")
	},

	render: function(){
		 // form tagista onSubmit={event.preventDefault()}, otettu pois, (bugas firefoxissa)
		return (
			<div className='right-container'>
				<div id='leftPane' className='col-xs-0 col-md-2'>
				</div>
				<div id='centerPane' className='col-xs-12 col-md-8'>

					<h1 className="text-center">Create new event</h1>
					<form id='form' className='form' data-toggle="validator" data-disable="false" role='form'>
						<div className='form-group'>
							<div className='required'>
								<input type='text' value={this.state.name} onChange={this.handleChange('name')} className='test form-control' id='name' placeholder='Event name' required/>
							</div>
							<div className="help-block with-errors"></div>
						</div>

						<div className='form-group required'>
							<div className='input-group'>
								<input type='text' data-minlength="6" value={this.state.address} onChange={this.handleChange('address')} className='form-control' id='address' placeholder='Fill address here or click on the map' required/>
								<span className="input-group-addon add-on white-background" onClick={this.searchByAddress}>
									 <span className="glyphicon glyphicon-search"></span>
								</span>
							</div>
							<div className="help-block with-errors"></div>
						</div>
 	
						<div className='form-group required'>
							<div className="input-group full-width">
					          <DatePicker
					          	selected={this.state.date}
					          	dateFormat= 'DD.MM.YYYY'
						        key="example3"
						        minDate={Moment()}
						        onChange={this.handleNewDateChange}
						        placeholderText="Date: dd:mm:yyyy"
						       />
					        </div>
					        <div id="errorDivForDateField" className="help-block with-errors dark-red-text">Please fill out this field</div>
						</div>

						<div className='form-group required'>
							<div className='input-group'>
								<input type='text'  pattern="^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"  value={this.state.time} onChange={this.handleTimeChange} className='form-control' id='time' placeholder="Time: hh:mm" required/>
								<span className="input-group-addon add-on white-background"  onClick={this.setCurrentTime}>
									<span className="glyphicon glyphicon-time"></span>
								</span>
							</div>
							<div className="help-block with-errors"></div>
						</div>

						<div className='form-group'>
							<textArea type='text' value={this.state.description} onChange={this.handleChange('description')} className='form-control' id='description' placeholder='Description'/>
						</div>
						<div className="form-group">
				            <button className="btn btn-default" type="submit">Submit</button>
					    </div>
					
					 </form>

				</div>
				<div id='rightPane' className='col-xs-0 col-md-2'>
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