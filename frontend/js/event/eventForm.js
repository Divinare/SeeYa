var React = require('react');
var Router = require('react-router');
var DatePicker = require('react-datepicker');
var Select = require('react-select');
var Moment = require('moment')
var validator = require('bootstrap-validator')
//var $ = require('jquery-autocomplete-js');
var autocomplete;
var componentForm = ['street-address', 'country-name', 'postal-code'];

var EventForm = React.createClass({
	mixins: [ Router.Navigation, Router.State ],

    getInitialState: function() {
	    return {
	    };
	},
	
	componentWillMount: function() {

	},
                
	componentDidMount: function() {
		if(this.isEditForm()){
			console.log("editform")
			this.autoFillEventDetails();
		}
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
/*
		var addressField = document.getElementById('address');
		var options = {
			types: ['geocode']
		};//{componentRestrictions: {country: 'us'}};

		autocomplete = new google.maps.places.Autocomplete(
			addressField,
			options
		);
*/


// TODO LINK:
 // http://stackoverflow.com/questions/7865446/google-maps-places-api-v3-autocomplete-select-first-option-on-enter

    	var input = document.getElementById('searchTextField');

        // store the original event binding function
        /*
        var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

        function addEventListenerWrapper(type, listener) {
            // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
            // and then trigger the original listener.
            if (type == "keydown") {
                var orig_listener = listener;
                listener = function(event) {
                    var suggestion_selected = $(".pac-item-selected").length > 0;
                    if (event.which == 13 && !suggestion_selected) {
                        var simulated_downarrow = $.Event("keydown", {
                            keyCode: 40,
                            which: 40
                        });
                        orig_listener.apply(input, [simulated_downarrow]);
                    }

                    orig_listener.apply(input, [event]);
                };
            }

            _addEventListener.apply(input, [type, listener]);
        }

        input.addEventListener = addEventListenerWrapper;
        input.attachEvent = addEventListenerWrapper;

        var autocomplete = new google.maps.places.Autocomplete(input);


		// When the user selects an address from the dropdown, populate the address
		// fields in the form.
		autocomplete.addListener('place_changed', this.fillInAddress);
	
		*/
		this.state.dateFieldClicked = false
		var dateInput = document.querySelectorAll(".datepicker__input")[0]
		dateInput.setAttribute("data-validateDate", this.validateDate)
		dateInput.addEventListener('blur', this.handleOnBlur);
		this.hideRedBorderAndErrorText(dateInput, document.getElementById('errorDivForDateField'));
	},

	autoFillEventDetails: function() {
		var event = this.getQuery().event;
		var dateInput = document.querySelectorAll(".datepicker__input")[0]
		this.state.address = event.Address.streetAddress;
		this.state.name = event.name;
		var moment = Moment(event.timestamp, "x");	//x for unix ms timestamp
		this.state.date = moment;
		var time = moment.format("HH:mm");
		this.state.time = time
		this.state.description = event.description
		this.state.latLng = [event.lat, event.lon]
	},
	fillInAddress: function() {
		console.log("at fill in address");
		var place = autocomplete.getPlace();
		console.log("PLACE IS: ");
		console.log(place);
	    this.makeMarkerFromAddress(place);

	    // TODO
	    // To get address from coordinates
	    // http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=false

	},

	validateDate: function(date){
		//console.log("validating date...")
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

		var moment = this.addHoursAndMinsToDate();
		var latLng;
		if(this.isEditForm()){
			latLng = this.state.latLng;
		}else{
			latLng = UTILS.helper.getLatLon(this.props.newEventMarker);
		}

		var data = {
			name: this.state.name,
			address: address,
			description: this.state.description,
			timestamp: moment.unix()*1000,
			lat: latLng[0],
			lon: latLng[1]
		};		

		var success;
		var error = function( jqXhr, textStatus, errorThrown ){
		    console.log( errorThrown );
		};

		var moveOn = function(){
			that.props.getEvents();
		    that.transitionTo('home');
		}

		var addMissingEventFields = function(createdEventData){
			// Adding the missing fields of the created event:
		    createdEventData.Address = address;
		    createdEventData.Attendances = [];
		}

		//TODO: remove copy paste from the success functions if possible
		if(this.isEditForm()){
			success = function(createdEventData) {
		    	addMissingEventFields(createdEventData);
		        moveOn();
			};
			UTILS.rest.editEntry('event', this.getQuery().event.id, data, success, error);
		} else{
			success = function(createdEventData) {
		    	addMissingEventFields(createdEventData);
		    	that.props.newEventMarker.setMap(null);
		    	that.props.updateAppStatus('newEventMarker', {});
		        //that.props.addEventToFilteredEventList(createdEventData);
		        moveOn();
			};
			UTILS.rest.addEntry('event', data, success, error);
		}
	},

	addHoursAndMinsToDate: function(){
		var moment = this.state.date
		var hours = parseInt(this.state.time.substring(0, 2))
		var minutes = parseInt(this.state.time.substring(3, 5))
		moment.minutes(minutes)
		moment.hours(hours)
		return moment;
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

	makeMarkerFromAddress: function(place){
		console.log("search by address called!")
		console.log(place);
		if(typeof(place) == 'undefined' || typeof(place.address_components) == 'undefined') {
			console.log("Place was undefined. TODO: user should be warned now.")
		} else {
			var ad = place.address_components;
			for (var i = 0; i < ad.length; i++) {
				console.log(ad[i]);
				//console.log(place.adr_address);
		  	}
		}
	},

	isEditForm: function(){
		return this.getQuery().edit
	},

	getEditOrCreateTitle: function(){
		if(this.isEditForm()){
			return "Edit event"
		}
		return "Create new event"
	},

	render: function(){
		 // form tagista onSubmit={event.preventDefault()}, otettu pois, (bugas firefoxissa)
		return (
			<div className='right-container'>
					<h2 className="centeredHeader">Create new event</h2>
					<form className='form' role='form'>
						<div className='form-group'>
							<span for='name'>Name *</span>
							<input type='text' className='form-control' id='name'/>
						</div>
						<div className='form-group'>
							<span for='address'>Address *</span>
							<div className='input-group'>
								<input type='text' className='form-control' id='address'/>
								<span className="input-group-btn">
									 <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-search"></i></button>
								</span>
							</div>
						</div>

					<div className='form-group required'>
						<span for='date'>Date *</span>
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


						<div className='form-group'>
							<span for='time'>Time *</span>
							<div className='input-group'>
								<input type='text' className='form-control' id='time' placeholder="hh:mm"/>
								<span className="input-group-btn">
									 <button className="btn btn-default" type="button"><i className="glyphicon glyphicon-time"></i></button>
								</span>
							</div>
						</div>
						<div className='form-group'>
							<span for='description'>Description *</span>
							<input type='text' className='form-control' id='description'/>
						</div>
						<div className="form-group">
				            <button type="submit" className="btn btn-default">Submit</button>
					    </div>
					
					 </form>
			</div>

		)
	}

});

module.exports = EventForm;

//FORM WITH LABELS
/*
<div id="eventForm">
					<h2 className="centeredHeader">Create new event</h2>
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

					<div className='form-group required'>
						<label for='date'>Date</label>
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


			*/



			/*
NO LABELS:

						<div className='right-container'>
				<h2 className="text-center">{this.getEditOrCreateTitle()}</h2>
				<br />
				<form id='form' className='form' data-toggle="validator" data-disable="false" role='form'>
					<div className='form-group'>
						<div className='required'>
							<input type='text' value={this.state.name} onChange={this.handleChange('name')} className='test form-control' id='name' placeholder='Event name' required/>
						</div>
						<div className="help-block with-errors"></div>
					</div>

					<div className='form-group required'>
						<div className='input-group'>
							<input type='text' data-minlength="6" value={this.state.address} onChange={this.handleChange('address')} onBlur={this.fillInAddress} className='form-control' id='address' placeholder='Fill address here or click on the map' required/>
							<span className="input-group-addon add-on white-background" onClick={this.fillInAddress}>
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
							<input type='text'  pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"  value={this.state.time} onChange={this.handleTimeChange} className='form-control' id='time' placeholder="Time: hh:mm" required/>
							<span className="input-group-addon add-on white-background"  onClick={this.setCurrentTime}>
								<span className="glyphicon glyphicon-time"></span>
							</span>
						</div>
						<div className="help-block with-errors"></div>
					</div>

					<div className='form-group'>
						<textArea type='text' value={this.state.description} onChange={this.handleChange('description')} className='form-control description' id='description' placeholder='Description'/>
					</div>
					<div className="form-group">
			            <button className="btn btn-default" type="submit">Submit</button>
				    </div>
				
				 </form>
			</div>

			*/


			/*


			<div id='leftPane' className='col-xs-0 col-md-3'>
				</div>
				<div id='centerPane' className='col-xs-12 col-md-6'>

	</div>
				<div id='rightPane' className='col-xs-0 col-md-3'>
				</div>


				*/