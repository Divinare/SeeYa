var React = require('react');
var Router = require('react-router');

var EventFormDropdown = require('./eventFormDropdown.js');
var DatePicker = require('react-bootstrap-datetimepicker');
var Select = require('react-select');
var Moment = require('moment')
var commonUtils = require('../../../common/utils.js');
var commonValidator = require('../../../common/validators/validator.js');
var fieldLengths = require('../../../common/validators/fieldLengths.js');
var validator = UTILS.validator;
var msgComponent = require('../utils/messageComponent.js');
var constants = require('../utils/constants.js');

var autocomplete;
var placesService;
var geocoder;
var componentForm = ['street-address', 'country-name', 'postal-code'];

import { browserHistory } from 'react-router';

const EventForm = React.createClass({
    getInitialState: function() {
	    return {
	    	event: null,
	    	name: "",
	    	streetAddress: "",
	    	city: null,
	    	country: null,
	    	zipCode: null,
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

	componentDidUpdate: function(prevProps, prevState) {
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
		if( prevState.loading ){
			this.initAutocomplete();
		}
	},
                
	componentDidMount: function() {
        this.setToolbarIcons();
		var that = this;
		this.props.handleResize();
		if(this.isEditForm()){
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
		this.setDateSelectionPositionFunction();
	},

    setToolbarIcons: function() {
        var homeFunc = function() {
            browserHistory.push('/');
        }

        var toolbarComponentData = {
            "home": homeFunc
        }
        this.props.updateToolbarIcons(toolbarComponentData);
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
	  	var input = document.getElementById("address")
	  	if( input != null){
		  // Create the autocomplete object, restricting the search to geographical location types.
		  autocomplete = new google.maps.places.Autocomplete(
		      /** @type {!HTMLInputElement} */
		      (document.getElementById("address")),
		      {types: ['geocode']});
	  	}
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
				var address_components = results[0].address_components;
				var newAddress = that.getAddressFromAddressComponents(address_components);
				var updatedAddress = that.getUpdatedAddress(newAddress);

				that.updateAddress(results[0].geometry.location, newAddress);
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
		    position: latLng,
		    draggable: true
		});
		var icon = new google.maps.MarkerImage("../../assets/seeya_marker_new.png", null, null, null, new google.maps.Size(21,30));
		marker.setIcon(icon);

		if(this.props.newEventMarker != null) {
			this.props.newEventMarker.setMap(null);
		}
		this.props.updateAppStatus("newEventMarker", marker);
  	},

  	updateAddress: function(latLng, newAddress) {
   		this.setState({
   			latLng: latLng,
   			streetAddress: newAddress.streetAddress,
   			city: newAddress.city,
   			country: newAddress.country,
   			zipCode: newAddress.zipCode
		})
  	},

	codeAddressFromLatLng: function(latLng) {
		var that = this;
		geocoder.geocode({'location': latLng}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					var newAddress = that.getAddressFromAddressComponents(results[1].address_components);
					var updatedAddress = that.getUpdatedAddress(newAddress);
					that.updateAddress(latLng, updatedAddress);
				} else {
					console.log("____ No address found from latLng")
				}
			} else {
					console.log('____ Geocoder failed due to: ' + status);
			}
		});
	},

	getAddressFromAddressComponents: function(address_components) {
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
		var newStreetAddress = (commonUtils.notEmpty(newAddress.streetAddress)) ? newAddress.streetAddress : null;
		var newCountry = (commonUtils.notEmpty(newAddress.country)) ? newAddress.country : null;
		var newZipCode = (commonUtils.notEmpty(newAddress.zipCode)) ? newAddress.zipCode : null;
		var newCity = (commonUtils.notEmpty(newAddress.city)) ? newAddress.city : null;

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

		this.refs.dropDown.selectNoToggle(event.Category.name);
		var latLng = new google.maps.LatLng(event.lat,event.lon);

		this.setState({
			event: event,
			name: event.name,
			latlng: latLng,
			streetAddress: event.Address.streetAddress,
			city: event.Address.city,
			country: event.Address.country,
			zipCode: event.Address.zipCode,
			time: time,
			date: moment,
			description: event.description,
			selectedCategory: event.Category.name
		});
		this.centerAndSetMarker(latLng);
	},

	/*** DATE ***/

    handleNewDateChange: function(timestamp) {
    	if(timestamp == "Invalid date") {
    		console.log("INVALID DATE")
    		timestamp = this.readDateFromInputField(timestamp);
    	}
    	if(timestamp !== ""){
    		var moment = Moment(timestamp, "x")
	    	moment.hours(0);
	    	moment.minutes(0);
		    this.setState({
		       date: moment
		    });
    	}else{
    		this.setState({
    			date: null
    		})
    	}
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

		var moment = Moment(dateString, "DD-MM-YYYY-HH:mm");
		if( moment.isValid() ){
			console.log("valid")
			return moment;
		}else{
			console.log("invalid")
			return ""
		}
    },

    setDateFieldPlaceHolder: function() {
    	var inputField = document.getElementsByClassName("dateInputField")[0].getElementsByClassName("form-control")[0];
    	inputField.placeholder = "Date (DD:MM:YYYY)";
    },

    setDateSelectionPositionFunction: function() {
		$(".glyphicon-calendar").parent().click(
			function() {
				setTimeout(function(){ 
					$(".bootstrap-datetimepicker-widget").css("top", "-16px");
					var topDateSelect = $(".dropdown-menu").offset().top;
					var topCalendar = $(".glyphicon-calendar").parent().offset().top;
					var distance = Math.abs(topDateSelect-topCalendar)-277;
					$(".bootstrap-datetimepicker-widget").css("top", distance + "px");
					$(".right-container").scrollTop(0);
				}, 1);
			}
		)
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
		if(commonUtils.isEmpty(time)) {
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
        var description = $("#description").val();
        if(typeof description == "undefined") {
            return;
        }
        if(description.length == 0) {
            $("#charactersLeft").css("display", "none");
        } else {
            var charactersLeft = fieldLengths.eventDescriptionMaxLength - description.length;
            if(charactersLeft < 0) {
                charactersLeft = 0;
            }
            $("#charactersLeft").text("Characters left: " + charactersLeft);
            $("#charactersLeft").css("display", "block");
        }
        
        this.descriptionAutoresize();
	},

	descriptionAutoresize: function() {
		
        var description = $("#description").val();
        if(typeof description == "undefined") {
            return;
        }
        var lineHeight = parseInt($('#description').css('lineHeight'),10);
        if(description.length === 0) {
            $('#description').css("height", 3*lineHeight);
            return;
        }

        if(typeof $('#description')[0] !== "undefined") {
            var linesCount = $('#description')[0].scrollHeight / lineHeight;
            var currentHeight = $('#description')[0].clientHeight;
            var newHeight = linesCount*lineHeight;
            if(currentHeight < newHeight) {
                $('#description').css("height", newHeight);
            }
        }
	},
	

	/*** SUBMIT ***/

    handleSubmit: function(e) {
		var that = this;
		//e.preventDefault();
		var address = {
			streetAddress: this.state.streetAddress,
			city: this.state.city,
			country: this.state.country,
			zipCode: this.state.zipCode,
		}
		var latLng;
		if(this.state.latLng.length == 0) {
			latLng = [];
		} else {
			latLng = [this.state.latLng.lat(), this.state.latLng.lng()];
		}



		var name = this.state.name;
		// Override current streetAddress with the one in address input field
		//address.streetAddress = document.getElementById("address").value;

		var dateTimestamp = null
		if( this.state.date !== null){
			dateTimestamp  = this.state.date.unix()*1000;
		}
		var dateInputFieldVal = document.getElementsByClassName("dateInputField")[0].getElementsByClassName("form-control")[0].value;
		if(dateInputFieldVal.length == 0) {
			dateTimestamp = "";
		}
		var category = this.state.selectedCategory;
		var time = this.state.time;
		var description = this.state.description;
		// VALIDATIONS
		var valid1 = validator.validateField(commonValidator.validateEventName, name, "#name", "#nameError");
		var valid2 = validator.validateField(commonValidator.validateEventAddress, address, "#address", "#addressError");
		var valid3 = validator.validateField(commonValidator.validateEventLatLng, this.state.latLng, "#latLng", "#latLngError");
		var valid4 = validator.validateField(commonValidator.validateEventDate, dateTimestamp, "#date", "#dateError");
		var valid5 = validator.validateField(commonValidator.validateEventCategory, category, "#category", "#categoryError", "Select category from the list");
		var valid6 = validator.validateField(commonValidator.validateEventTime, [time, dateTimestamp], "#time-container", "#timeError");
		var valid7 = validator.validateField(commonValidator.validateEventDescription, description, "#description", "#descriptionError", "");

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

		var returnHome = function(){
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
		        returnHome();
                msgComponent.showMessageComponent('Event edited successfully', constants.SHOW_MSG_MS_DEFAULT, 'success')
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
		        returnHome();
                msgComponent.showMessageComponent('Event created successfully', constants.SHOW_MSG_MS_DEFAULT, 'success')
			};
			UTILS.rest.addEntry('event', eventData, success, error);
		}
	},

	getEditOrCreateTitle: function(){
		if(this.isEditForm()){
			return "Edit event"
		}
		return "What would you like to do?"
	},

	updateDateField: function(){
		if( this.state.date !== null ){
			return this.state.date.format('x')
		}else{
			return document.getElementsByClassName("dateInputField")[0].getElementsByClassName("form-control")[0].value;
		}
	},

	render: function(){
		var that = this;

		if(this.state.loading){
			return <div>Loading...</div>
		}

		return (
			<div id="eventFormContainer">
				<h2 className="centeredHeader">{that.getEditOrCreateTitle()}</h2>

				<div className='form' id="eventForm">

					{/* Name */}
					<div className='form-group'>
						<input type='text' className='form-control' id='name' value={this.state.name} onChange={this.handleChange('name')} placeholder='Event name'/>
					</div>
					<span className="validationError" id="nameError"></span>

					{/* Address */}
					<div className='form-group'>
						<input type='text' onBlur={this.addressOnBlur} value={this.state.streetAddress} onChange={this.handleChange('streetAddress')} data-checkaddress='checkaddress' className='form-control' id='address' placeholder='Fill address here or click on the map' />
					</div>
					<span className="validationError" id="addressError"></span>
					<span className="validationError" id="latLngError"></span>

					{/* Category */}
					<div className='form-group' id="category">
							<EventFormDropdown
								ref={'dropDown'}
								list={this.state.categories} selectCategory={this.selectCategory} 
								selected={this.state.selectedCategory}
							/> 						
						</div>
					<span className="validationError" id="categoryError"></span>

					{/* Date */}
					<div className='form-group' id='date'>
				        <div className="dateInputField">

							<DatePicker
								inputFormat="DD.MM.YYYY"
								dateTime={this.state.updateDateField}
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
						<div className='input-group' id='time-container'>
							<input type='text' className='form-control' id='time' value={this.state.time} onChange={this.handleChange("time")} placeholder="Time (hh:mm)" />
							<span className="input-group-btn">
								 <button className="btn btn-default" type="button" onClick={this.setCurrentTime}><i className="glyphicon glyphicon-time"></i></button>
							</span>
						</div>
					</div>
					<span className="validationError" id="timeError"></span>

					{/* Description */}
					<div className='form-group'>
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