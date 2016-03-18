var React = require('react');
var Router = require('react-router');
//var DatePicker = require('react-datepicker');

var DatePicker = require('react-bootstrap-datetimepicker');

//var DatePicker = require('../datePicker.js');
var Select = require('react-select');
var Moment = require('moment')
var validator = require('bootstrap-validator')
var EventFormDropdown = require('./eventFormDropdown.js');
//var $ = require('jquery-autocomplete-js');
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
	    	selectedCategory: "Other", //TODO: get the default category from backend
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
		this.props.handleResize();
		var that = this;
		/*var validatorOptions = {
			delay: 500,
			custom: {
				checkaddress: function($el){
					console.log("validating address")
					console.log(that.state.latLng)
					console.log(typeof that.state.latLng)
					console.log(that.state.latLng == null)
					return that.state.latLng == null;
				}
			},
			errors: {
				checkaddress: "Please search an address and pick a suggestion from the list"
			}
		}*/
		/*
		$('#form').validator()

		$('#form').validator().on('submit', function (e) {
			console.log("onsubmit")
			//Check date
			if( !that.showValidationInfoForDatePicker() ){
				e.preventDefault();
				console.log("date is not valid")
			}
			//Check coordinates
			if( typeof that.state.latLng == 'undefined' || that.state.latLng === null  ){
				e.preventDefault();
				//change the text in the address error div to tell that nothing was found with that address
				console.log("no coordinates")
			}
	  		if (e.isDefaultPrevented()) {
	   			console.log("invalid form");
	 		 } else {
	 		 	console.log("valid form, submitting")
	 		 	e.preventDefault();
	 		 	that.handleSubmit();
			 }
		})
*/

// TODO LINK:
 // http://stackoverflow.com/questions/7865446/google-maps-places-api-v3-autocomplete-select-first-option-on-enter
    	var input = document.getElementById('searchTextField');

		//var dateInput = document.querySelectorAll(".datepicker__input")[0]
		//dateInput.setAttribute("data-validateDate", this.validateDate)
		

		this.initAutocomplete();
		placesService = new google.maps.places.AutocompleteService();
		this.fetchCategories();
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
		if(typeof place == 'undefined' || typeof place.address_components == 'undefined') {
			console.log("Place was undefined. TODO: user should be warned now.")
		} else {
			var latLng = [];
			latLng[0] = place.geometry.location.lat();
			latLng[1] = place.geometry.location.lng();

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
		var dateInput = document.querySelectorAll(".datepicker__input")[0]

		this.state.address = {
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

		this.state.name = event.name;
		var moment = Moment(event.timestamp, "x");	//x for unix ms timestamp
		this.state.date = moment;
		var time = moment.format("HH:mm");
		this.state.time = time
		this.state.description = event.description
		this.state.latLng = [event.lat, event.lon]
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
		var hours = parseInt(time.substring(0, 2))
		var minutes = parseInt(time.substring(3, 5))
		date.minutes(minutes)
		date.hours(hours)
		return date.unix()*1000;
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
		var date = this.state.date;
		var category = this.state.selectedCategory;
		var time = this.state.time;
		var description = this.state.description;

		// VALIDATIONS
		
		var valid1 = this.validateField(this.validateName, name, "nameError", "Name must be 3-30 characters long.");
		var valid2 = this.validateField(this.validateAddress, address, "addressError", "Address incorrect. Did you select it from the list of address suggestions?");
		var valid3 = this.validateField(this.validateLatLng, this.state.latLng, "addressError", "Coordinates for address doesn't exist. Put a marker on the map");
		var valid4 = this.validateField(this.validateDate, date, "dateError", "Date error");
		var valid5 = this.validateField(this.validateCategory, category, "categoryError", "Category error");
		var valid6 = this.validateField(this.validateTime, time, "timeError", "Time error");
		var valid7 = this.validateField(this.validateDescription, description, "descriptionError", "Description can be max 500 characters long.");

		// If one of the validations fail, prevent submitting form
		if(!valid1 || !valid2 || !valid3 || !valid4 || !valid5 || !valid6 || !valid7) {
			console.log("form INVALID " + valid1 + valid2 + valid3 + valid4 + valid5 + valid6 + valid7);
			return;
		}

		var timestamp = this.combineTimeAndDate(date, time);

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

	validateField: function(func, value, field, message) {
		// Validation failed
		if(!func(value)) {
			$("#" + field).text(message);
			return false;
		} else {
			// Clear the error message if it exists
			$("#" + field).text("");
			return true;
		}
	},

	validateName: function(name){
		if(name.length < 3 || name.length > 30) {
			console.log("NAME FALSE: " + name.length);
			return false;
		}
		return true;
	},
	validateAddress: function(address){
		console.log("at validateAddress");
		if(address == null || typeof address == "undefined") {
			return false;
		}
		console.log(address.streetAddress)
		console.log(address.country)
		console.log(address.zipCode)

		if(address.streetAddress == null || address.country == null || address.zipCode == null) {
			return false;
		}
		return true;
	},
	validateLatLng: function(latLng) {
		return true;
	},
	validateDate: function(date){
		console.log("at validate date");
		console.log(date);
		if(date == null || typeof date == "undefined") {
			return false;
		}
		return true;
	},
	validateCategory: function(category){
		if(category == null || typeof category == "undefined" || category.length == 0) {
			return false;
		}
		return true;
	},
	validateTime: function(time){
		console.log("at validate time");
		console.log(time);
		return true;

	},
	validateDescription: function(description){
		if(description == null || typeof description == "undefined" || description.length == 0) {
			return true;
		}
		if(description.length > 500) {
			return false;
		}
		return true;
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
						<div className='input-group'>
							<input type='text' value={this.state.address.streetAddress} onBlur={this.addressOnBlur} data-checkaddress='checkaddress' className='form-control' id='address' placeholder='Fill address here or click on the map' required/>
							<span className="input-group-addon add-on white-background" onClick={this.fillInAddress}>
								 <span className="glyphicon glyphicon-search"></span>
							</span>
						</div>
					</div>
					<span className="validationError" id="addressError"></span>

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

					{/* Category */}
					<div className='form-group'>
							<span>Category *</span>
							<EventFormDropdown
								itemClassName={"itemDropdownEventForm"}
								useBootstrap={true}
								selectDivId="category-select-eventform"
								categoriesContentId="category-content-eventform"
								dropdownId="category-dropdown-eventform"
								list={this.state.categories} selectCategory={this.selectCategory} 
								selected={this.state.selectedCategory}
							/> 						
						</div>
					<span className="validationError" id="categoryError"></span>

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

/*

							<DatePicker
					          	selected={this.state.date}
					          	dateFormat= 'DD.MM.YYYY'
						        key="example3"
						        minDate={Moment()}
						        onChange={this.handleNewDateChange}
						        placeholderText="Date: dd:mm:yyyy"
						       />

						       */