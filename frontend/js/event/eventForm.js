var React = require('react');
var Router = require('react-router');

var EventFormDropdown = require('./eventFormDropdown.js');
var DatePicker = require('react-bootstrap-datetimepicker');
var Select = require('react-select');
var Moment = require('moment')
var Validator = require('../../../common/validators/validator.js');
var CommonUtils = require('../../../common/utils.js');

var autocomplete;
var placesService;
var componentForm = ['street-address', 'country-name', 'postal-code'];

const EventForm = React.createClass({

    getInitialState: function() {
	    return {
	    	name: "",
	    	address: {},
	    	latLng: [],
	    	date: Moment(),
	    	selectedDay: null,
	    	selectedCategory: "", //TODO: get the default category from backend
	    	time: "",
	    	description: "",
	    	categories: []

	    };
	},
	
	componentWillMount: function() {
	},
                
	componentDidMount: function() {
		if(this.isEditForm()){
			console.log("editform")
			this.autoFillEventDetails();
		}
		var that = this;
		// TODO LINK:
		// http://stackoverflow.com/questions/7865446/google-maps-places-api-v3-autocomplete-select-first-option-on-enter
    	var input = document.getElementById('searchTextField');

		//var dateInput = document.querySelectorAll(".datepicker__input")[0]
		//dateInput.setAttribute("data-validateDate", this.validateDate)
		

		this.initAutocomplete();
		placesService = new google.maps.places.AutocompleteService();
		
		if(this.state.categories.length == 0) {
			console.log("LENGTH WAS 0");
			this.fetchCategories();
		}
	},

	// Called when a field is changed
	handleChange: function(key) {
		console.log("at handleChange");
       return function (e) {
	       var state = {};
	       state[key] = e.target.value;
	       this.setState(state);
       }.bind(this);
    },

    isEditForm: function(){
		console.log(this.props.location.query);
		return this.props.location.query.edit; //this.getQuery().edit;
	},


	/*** ADDRESS ***/

	initAutocomplete: function() {
	  // Create the autocomplete object, restricting the search to geographical
	  // location types.
	  autocomplete = new google.maps.places.Autocomplete(
	      /** @type {!HTMLInputElement} */
	      (document.getElementById('address')),
	      {types: ['geocode']});

	  // When the user selects an address from the dropdown, populate the address
	  // fields in the form.
	  autocomplete.addListener('place_changed', this.fillInAddress);

	},

	addressOnBlur: function(){
		console.log("ADDRESS ON BLUR")
		console.log(autocomplete.getPlace())
	},

	fillInAddress: function() {
		console.log("at fill in address");
		var place = autocomplete.getPlace();
		console.log(place);
		if(typeof place.address_components == "undefined") {
			// Nothing to do here if address_components doesn't exist
			console.log("Address components did not exist");
			return;
		}

	    var newAddress = {};
	    var streetNumber;
	    for (var i = 0; i < place.address_components.length; i++) {
	    //	console.log("component " + i)
	    //	console.log(place.address_components[i])
			var addressObj = place.address_components[i];
			for(var j = 0; j < addressObj.types.length; j += 1) {
		    	if (addressObj.types[j] === 'country') {
		    		newAddress.country = addressObj.long_name
		    	}
		    	if (addressObj.types[j] === 'postal_code') {
		    		newAddress.zipCode = addressObj.long_name;
		    	}
		    	if (addressObj.types[j] === 'route') {
		    		newAddress.streetAddress = addressObj.long_name
		    	}
		    	if (addressObj.types[j] === 'street_number') {
		    		streetNumber = addressObj.long_name
		    	}
		    }
	    }
	    if( streetNumber != null && typeof newAddress.streetAddress != 'undefined' 
	    	&& newAddress.streetAddress != null ){
	    	newAddress.streetAddress = newAddress.streetAddress + " " + streetNumber
	    }
	    console.log("NEW ADDRESS")
	    console.log(newAddress)
   		this.setState({
			address:newAddress
		})

   		this.updateEventCoordsFromAddress(place)
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */
		(document.getElementById('address')),
		{types: ['geocode']});

	},

	updateEventCoordsFromAddress: function(place){
		console.log("at updateEventCoordsFromAddress");
		if(typeof place == 'undefined' || typeof place.address_components == 'undefined') {
			console.log("Place was undefined. TODO: user should be warned now.")
		} else {
			var latLng = [];
			latLng[0] = place.geometry.location.lat();
			latLng[1] = place.geometry.location.lng();
			console.log("LAT LONNNN");
			console.log(latLng);
			this.setState({
				latLng:latLng
			})
		}
	},

	makeMarkerFromAddress: function(place){
		console.log("search by address called!")
		console.log(place);
		if(typeof place == 'undefined' || typeof place.address_components == 'undefined') {
			console.log("Place was undefined. TODO: user should be warned now.")
		} else {
			var ad = place.address_components;
			console.log("coordinates");
			console.log(place.geometry.location.lat() + ", " + place.geometry.location.lng());
			for (var i = 0; i < ad.length; i++) {
				console.log(ad[i]);
				//console.log(place.adr_address);
		  	}
		}
	},

	// Called when editing event
	autoFillEventDetails: function() {
		var event = this.getQuery().event;
		//var dateInput = document.querySelectorAll(".datepicker__input")[0]

		address = {
			streetAddress: event.Address.streetAddress,
			country: event.Country,
			zipCode: event.ZipCode,
		}

		/*console.log("EVENT");
		console.log(event);
		console.log("EVENT ADDRESS")
		console.log(event.Address)
		console.log(event.Address.streetAddress)
		console.log(event.Country);
		console.log(event.ZipCode);
		*/

		var moment = Moment(event.timestamp, "x");	//x for unix ms timestamp
		var time = moment.format("HH:mm");
		var date = moment.format("DD.MM.YYYY")

		this.setState({
			name: event.name,
			address: address,
			latLng: [event.lat, event.lon],
			date: event.date,
			category: event.category,
			time: time,
			description: event.description
		})

	},

	/*** DATE ***/

    handleNewDateChange: function(moment) {
    	console.log("AT : handleNewDateChange")
    	console.log(moment);
    	//$("#date").val(moment);
	    this.setState({
	       date: moment
	    });
    },

	/*** CATEGORY ***/

    fetchCategories: function(){
		var that = this;

        var onSuccess = function (data) {
        	console.log("fetched categories")
            var categories = [];
            for(var index in data) {
                categories.push(data[index]);
            }
            that.setState({
                categories: categories
            })
            console.log(categories);
        };
        var onError = function() {
            console.log("Error on fetching event!");
        }
        UTILS.rest.getAllEntries('category', onSuccess, onError);
	},

	selectCategory: function(category) {
		console.log("selected category")
        this.setState({
            selectedCategory: category
        });
    },

	/*** TIME ***/

	handleTimeChange: function(e){
		this.setState({time: e.target.value})
	},

	combineTimeAndDate: function(date, time){
		if(CommonUtils.isEmpty(time)) {
			time = "00:00";
		}
		console.log("At combine!!");
		console.log(date);
		console.log(time);
		var hours = parseInt(time.substring(0, 2))
		var minutes = parseInt(time.substring(3, 5))
		date.minutes(minutes)
		date.hours(hours)
		return date.unix();
	},

	setCurrentTime: function() {
		var str = Moment().format('HH:mm');
		$('#time').val(str);
		this.setState({time: str})
		$('#time').blur();
	},

	/*** SUBMIT ***/

    handleSubmit: function(e) {
		console.log("AT SUBMIT!!!!!!!!!!");
		var that = this;
		//e.preventDefault();
		var address = {
			streetAddress: this.state.address,
			country: this.state.address.country,
			zipCode: this.state.address.zipCode,
		}
		console.log(this.state.latLng);
		var name = this.state.name;
		var address = this.state.address;
		var lat = this.state.latLng[0];
		var lon = this.state.latLng[1];
		var date = this.state.date
		var category = this.state.selectedCategory;
		var time = this.state.time;
		var description = this.state.description;

		var timestamp = this.combineTimeAndDate(date, time);

		// VALIDATIONS
		var valid1 = this.validateField(Validator.validateEventName, name, "nameError");
		var valid2 = this.validateField(Validator.validateEventAddress, address, "addressError");
		var valid3 = this.validateField(Validator.validateEventLatLng, this.state.latLng, "latLngError");
		var valid4 = this.validateField(Validator.validateEventDate, timestamp, "dateError");
		var valid5 = this.validateField(Validator.validateEventCategory, category, "categoryError");
		var valid6 = this.validateField(Validator.validateEventTime, time, "timeError");
		var valid7 = this.validateField(Validator.validateEventDescription, description, "descriptionError");

		// If one of the validations fail, prevent submitting form
		if(!valid1 || !valid2 || !valid3 || !valid4 || !valid5 || !valid6 || !valid7) {
			console.log("form INVALID " + valid1 + valid2 + valid3 + valid4 + valid5 + valid6 + valid7);
			return;
		}


		var eventData = {
			name: name,
			address: address,
			description: description,
			timestamp: timestamp,
			lat: lat,
			lon: lon,
			category: this.state.selectedCategory
		};		

		console.log("DATAAAAAAAAAA");
		console.log(eventData);
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
			UTILS.rest.editEntry('event', this.getQuery().event.id, eventData, success, error);
		} else{
			success = function(createdEventData) {
		    	addMissingEventFields(createdEventData);
		    	that.props.newEventMarker.setMap(null);
		    	that.props.updateAppStatus('newEventMarker', {});
		        //that.props.addEventToFilteredEventList(createdEventData);
		        moveOn();
			};
			UTILS.rest.addEntry('event', eventData, success, error);
		}
	},

	/*** VALIDATIONS ***/

	validateField: function(func, params, field) {
		var errorMessage = func(params);
		console.log("ERROR: " + errorMessage);
		if(CommonUtils.isEmpty(errorMessage)) {
			// Clear the error message if it exists
			$("#" + field).text("");
			return true;
		}
		// Validation failed
		else {
			console.log("validation failed " + field);
			$("#" + field).text(errorMessage);
			return false;
		}
	},


	getEditOrCreateTitle: function(){
		if(this.isEditForm()){
			return "Edit event"
		}
		return "Create new event"
	},

	 handleDayClick: function(e, day, modifiers) {
		if (modifiers.indexOf("disabled") > -1) {
			console.log("User clicked a disabled day.");
			return;
		}
		this.setState({
			selectedDay: day
		});
  	},

	isSunday: function(day) {
	  return day.getDay() === 0;
	},

	render: function(){

		return (
			<div className='right-container'>
				<h2 className="centeredHeader">Create new event</h2>

				<div className='form'>

					{/* Name */}
					<div className='form-group'>
						<span>Name *</span>
						<input type='text' className='form-control' id='name' onChange={this.handleChange('name')} />
					</div>
					<span className="validationError" id="nameError"></span>

					{/* Address */}
					<div className='form-group'>
						<span htmlFor='address'>Address *</span>
						<input type='text' onBlur={this.addressOnBlur} data-checkaddress='checkaddress' className='form-control' id='address' placeholder='Fill address here or click on the map' />
					</div>
					<span className="validationError" id="addressError"></span>
					<span className="validationError" id="latLngError"></span>

					{/* Date */}
					<div className='form-group'>
						<span>Date *</span>
				        <div className="dateInputField">

							<DatePicker
								inputFormat="DD.MM.YYYY"
								size="md"
								mode="date"
								viewMode="days"
								showToday={true}
								minDate={Moment()}
								maxDate={Moment().add(1, "years")}
							   onChange={this.handleNewDateChange}
							 />

						</div>
					</div>
					<span className="validationError" id="dateError"></span>

					{/* Time */}
					<div className='form-group'>
						<span>Time *</span>
						<div className='input-group'>
							<input type='text' className='form-control' id='time' placeholder="hh:mm"/>
							<span className="input-group-btn">
								 <button className="btn btn-default" type="button" onClick={this.setCurrentTime}><i className="glyphicon glyphicon-time"></i></button>
							</span>
						</div>
					</div>
					<span className="validationError" id="timeError"></span>

					{/* Category */}
					<div className='form-group'>
							<span>Category *</span>
							<EventFormDropdown
								itemClassName={"itemDropdownEventForm"}
								list={this.state.categories} selectCategory={this.selectCategory} 
								selected={this.state.selectedCategory}
							/> 						
						</div>
					<span className="validationError" id="categoryError"></span>

					{/* Description */}
					<div className='form-group'>
						<span>Description *</span>
						<input type='text' className='form-control' id='description' onChange={this.handleChange('description')}/>
					</div>
					<span className="validationError" id="descriptionError"></span>

					{/* Submit */}
					<div className="form-group">
			            <button className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
				    </div>
			
				</div>
			</div>
		)
	}

});

module.exports = EventForm;