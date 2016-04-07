var React = require('react');
var Router = require('react-router');

var EventFormDropdown = require('./eventFormDropdown.js');
var DatePicker = require('react-bootstrap-datetimepicker');
var Select = require('react-select');
var Moment = require('moment')
var Validator = require('../../../common/validators/validator.js');
var CommonUtils = require('../../../common/utils.js');
var fieldLengths = require('../../../common/validators/fieldLengths.js');

var autocomplete;
var placesService;
var geocoder;
var componentForm = ['street-address', 'country-name', 'postal-code'];

import { browserHistory } from 'react-router';

const EventForm = React.createClass({
    getInitialState: function() {
    	console.log("GET INITIAL STATE")
	    return {
	    	event: null,
	    	name: "",
	    	address: {},
	    	latLng: [],
	    	date: Moment(), // unix_timestamp
	    	selectedDay: null,
	    	selectedCategory: "", //TODO: get the default category from backend
	    	time: "",
	    	description: "",
	    	categories: [],
	    	loading:false

	    };
	},
	
	componentWillMount: function() {
	},

	componentDidUpdate: function() {
		var newEventMarker = this.props.newEventMarker;
		if(newEventMarker != null && !$.isEmptyObject(newEventMarker)) {

			var lat = newEventMarker.position.lat();
			var lng = newEventMarker.position.lng();
			console.log(lat);
			console.log(lng);
			var currentLatLng = this.state.latLng;

			if(currentLatLng.length == 0) {		
				this.codeAddressFromLatLng(newEventMarker.position);
			} else {

				console.log(currentLatLng);
				var currentLat = this.state.latLng.lat();
				var currentLng = this.state.latLng.lng();

				console.log(currentLat);
				console.log(currentLng);
		
				if(lat != currentLat && lng != currentLng) {
					this.codeAddressFromLatLng(newEventMarker.position);

				} else {
					console.log("... Doing nothing because the State has the same latLng")
				}
			}

		}
	},
                
	componentDidMount: function() {
		var that = this;
		this.props.handleResize();
		if(this.isEditForm()){
			console.log("editform")
			var error = function(){
				//there was an error fetching the event, maybe it has been deleted. For now just redirect to home page
				browserHistory.push('/')	
			}
			this.setState({
				loading: true
			});
			UTILS.rest.getEntry('event', that.props.params.id, that.autoFillEventDetails, error);
		}

		// TODO LINK:
		// http://stackoverflow.com/questions/7865446/google-maps-places-api-v3-autocomplete-select-first-option-on-enter
		this.initAutocomplete();
		placesService = new google.maps.places.AutocompleteService();
		geocoder = new google.maps.Geocoder();

		if(this.state.categories.length == 0) {
			this.fetchCategories();
		}
		this.setDateFieldPlaceHolder();
		this.setupDescriptionAutoresize();
	},

	// Called when a field is changed
	handleChange: function(key) {
		if(key == "description") {
			this.maxLengthForDesription();
		}

       return function (e) {
	       var state = {};
	       state[key] = e.target.value;
	       this.setState(state);
       }.bind(this);
    },

    isEditForm: function(){
    	var path = this.props.location.pathname;
		return path.indexOf('edit') > -1
	},


	/*** ADDRESS ***/

	initAutocomplete: function() {
	  // Create the autocomplete object, restricting the search to geographical location types.
	  autocomplete = new google.maps.places.Autocomplete(
	      /** @type {!HTMLInputElement} */
	      (document.getElementById("address")),
	      {types: ['geocode']});
	},	

	addressOnBlur: function(){
		var that = this;
		setTimeout(function () {
        	that.codeAddressFromString();
    	}, 100);
	},

	// Gets address from input field and tries to get the corresponding address information
	codeAddressFromString: function() {
		var that = this;
	    var address = document.getElementById('address').value;
	    
	    geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				console.log("results")
				console.log(results)
				var address_components = results[0].address_components;
				var newAddress = that.getAddressFromAddressComponents(address_components);
				var updatedAddress = that.getUpdatedAddress(newAddress);

		   		that.setState({
		   			latLng: results[0].geometry.location,
		   			address: updatedAddress
				})
		   		that.centerAndSetMarker(results[0].geometry.location);

			} else {
				console.log("Geocode was not successful for the following reason: " + status);
			}
 		});

  	},

  	centerAndSetMarker: function(latLng){
		map.setCenter(latLng);
		var marker = new google.maps.Marker({
		    map: map,
		    position: latLng
		});
		var icon = new google.maps.MarkerImage("../../assets/seeya_marker.png", null, null, null, new google.maps.Size(21,30));
		marker.setIcon(icon);

		if(this.props.newEventMarker != null) {
			console.log("REMOVING MARKER : codeAddressFromString");
			this.props.newEventMarker.setMap(null);
		}
		this.props.updateAppStatus("newEventMarker", marker);
		console.log("ending center and ")
  	},

	codeAddressFromLatLng: function(latLng) {
		var that = this;
		geocoder.geocode({'location': latLng}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					var newAddress = that.getAddressFromAddressComponents(results[1].address_components);
					var updatedAddress = that.getUpdatedAddress(newAddress);
					that.setState({
						address: updatedAddress,
						latLng: latLng
					});
				} else {
					console.log("____ No address found from latLng")
				}
			} else {
					console.log('____ Geocoder failed due to: ' + status);
			}
		});
	},

	getAddressFromAddressComponents: function(address_components) {
		console.log("at getAddressFromAddressComponents");
		console.log(address_components);
		if(typeof address_components == "undefined") {
			// Nothing to do here if address_components doesn't exist
			return {};
		}

	    var newAddress = {};
	    var streetNumber;
	    for (var i = 0; i < address_components.length; i++) {
			var addressObj = address_components[i];
			for(var j = 0; j < addressObj.types.length; j += 1) {
		    	if (addressObj.types[j] === 'country') {
		    		newAddress.country = addressObj.long_name
		    	}
		    	if (addressObj.types[j] === 'postal_code') {
		    		newAddress.zipCode = addressObj.long_name;
		    	}
		    	if (addressObj.types[j] === 'route') {		//we keep the whole formatted address in the streetaddress field
		    		//newAddress.streetAddress = addressObj.long_name
		    	}
		    	if (addressObj.types[j] === 'street_number') {
		    		streetNumber = addressObj.long_name
		    	}
		    }
	    }
	    newAddress.streetAddress = $("#address").val();
	    if( streetNumber != null && typeof newAddress.streetAddress != 'undefined' 
	    	&& newAddress.streetAddress != null ){
	    	newAddress.streetAddress = newAddress.streetAddress + " " + streetNumber
	    }
	    return newAddress;
	},

	//TODO we probably don't want to ever use the old city, country and zipcode? So should just be null if it is null?
	getUpdatedAddress: function(newAddress) {
		var newStreetAddress = (CommonUtils.notEmpty(newAddress.streetAddress)) ? newAddress.streetAddress : null;
		var newCountry = (CommonUtils.notEmpty(newAddress.country)) ? newAddress.country : null;
		var newZipCode = (CommonUtils.notEmpty(newAddress.zipCode)) ? newAddress.zipCode : null;
		var newCity = (CommonUtils.notEmpty(newAddress.city)) ? newAddress.city : null;

		var updatedAddress = {
			streetAddress: newStreetAddress,
			country: newCountry,
			zipCode: newZipCode,
			city: newCity
		}
		return updatedAddress;
	},

	// Called when editing event
	autoFillEventDetails: function(event) {
		this.setState({
			loading:false
		})
		var moment = Moment(event.timestamp, "x");	//x for unix ms timestamp
		var time = moment.format("HH:mm");
		moment.hour(0);
		moment.minute(0);
		//var date = moment.format("DD.MM.YYYY")
		this.refs.dropDown.selectNoToggle(event.Category.name);
		var latLng = new google.maps.LatLng(event.lat,event.lon);
		//var latLng = new google.maps.LatLng(14.4583953, 100.1314186)
		console.log("ADDRESS:")
		console.log(event.Address)
		console.log(event.lat)
		console.log(event.lon)
		var address = {
			streetAddress: event.Address.streetAddress,
			city: event.Address.city,
			country: event.Address.country,
			zipCode: event.Address.zipCode
		}
		console.log(address)
		this.setState({
			event: event,
			name: event.name,
			time: time,
			date: moment,
			description: event.description,
			selectedCategory: event.Category.name,
			latlng: latLng,
			address: address
		});
		this.centerAndSetMarker(latLng);
	},

	/*** DATE ***/

    handleNewDateChange: function(timestamp) {
    	if(timestamp == "Invalid date") {
    		timestamp = this.readDateFromInputField(timestamp);
    	}
    	var moment = Moment(timestamp, "x")
    	moment.hours(0);
    	moment.minutes(0);
	    this.setState({
	       date: moment
	    });
    },

    readDateFromInputField: function(timestamp) {
		var val = document.getElementsByClassName("dateInputField")[0].getElementsByClassName("form-control")[0].value;
		if(val.length == 0) {
		    return "";
		}
		var parts = [];
		if(val.indexOf('/') !== -1) {
			parts = val.split('/');
		} else if(val.indexOf('.') !== -1) {
			parts = val.split('.');
		} else if(val.indexOf(':') !== -1) {
			parts = val.split(':');
		} else {
			return "";
		}
		var date = parseInt(parts[0]);
		var month = parseInt(parts[1]);
		var year = parseInt(parts[2]);
		function isInt(value) {
		  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
		}
		if(!isInt(date) || !isInt(month) || !isInt(year)) {
			return "";
		}
		var dateString = date + "-" + month + "-" + year + "-" + "00:00";

		return Moment(dateString, "DD-MM-YYYY-HH:mm");
    },

    setDateFieldPlaceHolder: function() {
    	var inputField = document.getElementsByClassName("dateInputField")[0].getElementsByClassName("form-control")[0];
    	inputField.placeholder = "Date (DD:MM:YYYY)";
    },

	/*** CATEGORY ***/

    fetchCategories: function(){
		var that = this;

        var onSuccess = function (data) {
            var categories = [];
            for(var index in data) {
                categories.push(data[index]);
            }
            that.setState({
                categories: categories
            })
        };
        var onError = function() {
            console.log("... Error on fetching categories!");
        }
        UTILS.rest.getAllEntries('category', onSuccess, onError);
	},

	selectCategory: function(category) {
        this.setState({
            selectedCategory: category
        });
    },

	/*** TIME ***/

	handleTimeChange: function(e){
		this.setState({time: e.target.value})
	},

	combineTimeAndDate: function(dateTimestamp, time){
		if(CommonUtils.isEmpty(time)) {
			time = "00:00";
		}
		var hours = parseInt(time.substring(0, 2))
		var minutes = parseInt(time.substring(3, 5))
		dateTimestamp += minutes * 60 * 1000;
		dateTimestamp += hours * 60 * 60 * 1000;
		return dateTimestamp;
	},

	setCurrentTime: function() {
		var str = Moment().format('HH:mm');
		$('#time').val(str);
		this.setState({time: str})
		$('#time').blur();
	},


	/*** DESCRIPTION ***/

	maxLengthForDesription: function() {
		var textLength = $("#description").val();
		if(typeof textLength !== "undefined") {
			if(textLength.length == 0) {
				$("#charactersLeft").css("display", "none");
			} else {
				var charactersLeft = fieldLengths.eventDescriptionMaxLength - textLength.length;
				if(charactersLeft < 0) {
					charactersLeft = 0;
				}
				$("#charactersLeft").text("Characters left: " + charactersLeft);
				$("#charactersLeft").css("display", "block");
			}
		}
	},

	setupDescriptionAutoresize: function() {

		$('textarea').keyup(function (e) {
			var element = $("#description");
			var text = $("#description").val();
			if(text.length == 0) {
				element.css("height", 0);
			} else {
		    	var rows = $(this).val().split("\n");
				var currentHeight = element.height();
				var newHeight = ((rows.length +1)*20);
				if(newHeight > currentHeight) {
					element.css("height", newHeight);
				}
			}

		});
	},

	/*** SUBMIT ***/

    handleSubmit: function(e) {
		var that = this;
		//e.preventDefault();
		var address = {
			streetAddress: this.state.address,
			country: this.state.address.country,
			zipCode: this.state.address.zipCode,
		}
		var latLng;
		if(this.state.latLng.length == 0) {
			latLng = [];
		} else {
			latLng = [this.state.latLng.lat(), this.state.latLng.lng()];
		}



		var name = this.state.name;
		var address = this.state.address;
		// Override current streetAddress with the one in address input field
		address.streetAddress = document.getElementById("address").value;

		var dateTimestamp = this.state.date.unix()*1000;
		console.log("DATE TIME STAMP")
		console.log(dateTimestamp)

		var dateInputFieldVal = document.getElementsByClassName("dateInputField")[0].getElementsByClassName("form-control")[0].value;
		if(dateInputFieldVal.length == 0) {
			dateTimestamp = "";
		}
		var category = this.state.selectedCategory;
		var time = this.state.time;
		var description = this.state.description;
		// VALIDATIONS
		var valid1 = this.validateField(Validator.validateEventName, name, "nameError");
		var valid2 = this.validateField(Validator.validateEventAddress, address, "addressError");
		var valid3 = this.validateField(Validator.validateEventLatLng, this.state.latLng, "latLngError");
		var valid4 = this.validateField(Validator.validateEventDate, dateTimestamp, "dateError");
		var valid5 = this.validateField(Validator.validateEventCategory, category, "categoryError", "Select category from the list");
		var valid6 = this.validateField(Validator.validateEventTime, [time, dateTimestamp], "timeError");
		var valid7 = this.validateField(Validator.validateEventDescription, description, "");

		// If one of the validations fail, prevent submitting form
		if(!valid1 || !valid2 || !valid3 || !valid4 || !valid5 || !valid6 || !valid7) {
			console.log("form INVALID " + valid1 + valid2 + valid3 + valid4 + valid5 + valid6 + valid7);
			return;
		}
		var timestamp = this.combineTimeAndDate(dateTimestamp, time);

		var eventData = {
			name: name,
			address: address,
			description: description,
			timestamp: timestamp,
			lat: latLng[0],
			lon: latLng[1],
			category: category
		};		

		var success;
		var error = function( jqXhr, textStatus, errorThrown ){
		    console.log( errorThrown );
		};

		var moveOn = function(){
			that.props.getEvents();
		    browserHistory.push('/');
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
			UTILS.rest.editEntry('event', this.props.params.id, eventData, success, error);
		} else{
			success = function(createdEventData) {
		    	addMissingEventFields(createdEventData);
				if(that.props.newEventMarker != null && !$.isEmptyObject(that.props.newEventMarker)) {
			    	that.props.newEventMarker.setMap(null);
			    	that.props.updateAppStatus('newEventMarker', null);
		    	}
		        //that.props.addEventToFilteredEventList(createdEventData);
		        moveOn();
			};
			UTILS.rest.addEntry('event', eventData, success, error);
		}
	},

	/*** VALIDATIONS ***/

	validateField: function(func, params, field, customMessage) {
			console.log("FIELD::::: " + field);

		var errorMessage = func(params, customMessage);
		var formInputField = field.replace("Error", "");
		if(CommonUtils.isEmpty(errorMessage)) {
			// Clear the error message if it exists
			$("#" + field).text("");
			$("#" + formInputField).removeClass("invalid");

			return true;
		}
		// Validation failed
		else {
			$("#" + field).text(errorMessage);
			$("#" + formInputField).addClass("invalid");
			return false;
		}
	},

	getEditOrCreateTitle: function(){
		if(this.isEditForm()){
			return "Edit event"
		}
		return "What do you want to do?"
	},

	render: function(){
		var that = this;

		if(this.state.loading){
			return <div>Loading...</div>
		}

		return (
			<div className="eventFormContainer">
				<h1 className="centeredHeader">{that.getEditOrCreateTitle()}</h1>

				<div className='form' id="eventForm">

					{/* Name */}
					<div className='form-group' id="name">
						<input type='text' className='form-control' id='name' value={this.state.name} onChange={this.handleChange('name')} placeholder='Event name'/>
					</div>
					<span className="validationError" id="nameError"></span>

					{/* Address */}
					<div className='form-group' id="address">
						<input type='text' onBlur={this.addressOnBlur} value={this.state.address.streetAddress} data-checkaddress='checkaddress' className='form-control' id='address' placeholder='Fill address here or click on the map' />
					</div>
					<span className="validationError" id="addressError"></span>
					<span className="validationError" id="latLngError"></span>

					{/* Date */}
					<div className='form-group' id="date">
				        <div className="dateInputField">

							<DatePicker
								inputFormat="DD.MM.YYYY"
								dateTime={this.state.date.format('x')}
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
					<div className='form-group' id="time">
						<div className='input-group'>
							<input type='text' className='form-control' id='time' value={this.state.time} onChange={this.handleChange("time")} placeholder="Time (hh:mm)" />
							<span className="input-group-btn">
								 <button className="btn btn-default" type="button" onClick={this.setCurrentTime}><i className="glyphicon glyphicon-time"></i></button>
							</span>
						</div>
					</div>
					<span className="validationError" id="timeError"></span>

					{/* Category */}
					<div className='form-group' id="category">
							<EventFormDropdown
								ref={'dropDown'}
								itemClassName={"itemDropdownEventForm"}
								list={this.state.categories} selectCategory={this.selectCategory} 
								selected={this.state.selectedCategory}
							/> 						
						</div>
					<span className="validationError" id="categoryError"></span>

					{/* Description */}
					<div className='form-group' id="description">
						<textarea type='text' className='form-control' id='description' maxLength="500" value={this.state.description} onChange={this.handleChange('description')} placeholder="Description"/>
					</div>
					<span id="charactersLeft"></span>

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