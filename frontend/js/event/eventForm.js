var React = require('react');
var Router = require('react-router');
var DatePicker = require('react-datepicker');
var Select = require('react-select');
var Moment = require('moment')
var validator = require('bootstrap-validator')
var Dropdown = require('../dropdown.js');
//var $ = require('jquery-autocomplete-js');
var autocomplete;
var placesService;
var componentForm = ['street-address', 'country-name', 'postal-code'];

const EventForm = React.createClass({

    getInitialState: function() {
	    return {
	    	address: {},
	    	categories: [],
	    	selectedCategory: "Other", //TODO: get the default category from backend
	    	latLng: null
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


// TODO LINK:
 // http://stackoverflow.com/questions/7865446/google-maps-places-api-v3-autocomplete-select-first-option-on-enter
    	var input = document.getElementById('searchTextField');

		this.setState({dateFieldClicked: false})
		var dateInput = document.querySelectorAll(".datepicker__input")[0]
		dateInput.setAttribute("data-validateDate", this.validateDate)
		dateInput.addEventListener('blur', this.handleOnBlur);
		this.hideRedBorderAndErrorText(dateInput, document.getElementById('errorDivForDateField'));
		this.initAutocomplete();
		placesService = new google.maps.places.AutocompleteService();
		this.fetchCategories();
	},

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

	autoFillEventDetails: function() {
		var event = this.getQuery().event;
		var dateInput = document.querySelectorAll(".datepicker__input")[0]

		this.state.address = {
			streetAddress: event.Address.streetAddress,
			country: event.Country,
			zipCode: event.ZipCode,
		}

		console.log("EVENT ADDRESS")
		console.log(event.Address)
		console.log(event.Address.streetAddress)

		this.state.name = event.name;
		var moment = Moment(event.timestamp, "x");	//x for unix ms timestamp
		this.state.date = moment;
		var time = moment.format("HH:mm");
		this.state.time = time
		this.state.description = event.description
		this.state.latLng = [event.lat, event.lon]
	},

	validateDate: function(date){
		//console.log("validating date...")
	},

    handleNewDateChange: function(moment) {
    	//var d = moment.format('MM-DD-YYYY'))
	   // console.log(moment.format('MM-DD-YYYY'));
	    this.setState({
	       date: moment,
	    });
	    this.showValidationInfoForDatePicker(moment);

    },

	handleTimeChange: function(e){
		this.setState({time: e.target.value})
	},

	handleSubmit: function(e) {
		console.log("submit method")
		var that = this;
		//e.preventDefault();
		var address = {
			streetAddress: this.state.address,
			country: this.state.address.country,
			zipCode: this.state.address.zipCode,
		}

		var moment = this.addHoursAndMinsToDate();
	/*	if(this.isEditForm()){
			latLng = this.state.latLng;
		}else{
			latLng = UTILS.helper.getLatLon(this.props.newEventMarker);
		}*/


		console.log("ADDRESS: ")
		console.log(this.state.address)
		var data = {
			name: this.state.name,
			address: this.state.address,
			description: this.state.description,
			timestamp: moment.unix()*1000,
			lat: this.state.latLng[0],
			lon: this.state.latLng[1],
			category: this.state.selectedCategory
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

	isEditForm: function(){
		console.log(this.props.location.query);
		return this.props.location.query.edit; //this.getQuery().edit;
	},

	getEditOrCreateTitle: function(){
		if(this.isEditForm()){
			return "Edit event"
		}
		return "Create new event"
	},

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
		/*console.log("PLACE IS: ");
		console.log(place);
	   // this.makeMarkerFromAddress(place);

	    console.log("address components: ")*/
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
	  //  console.log("NEW ADDRESS")
	    if( streetNumber != null && typeof newAddress.streetAddress != 'undefined' 
	    	&& newAddress.streetAddress != null ){
	    	newAddress.streetAddress = newAddress.streetAddress + " " + streetNumber
	    }
	    	  //  console.log(newAddress)
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

	selectCategory: function(category) {
		console.log("selected category")
        this.setState({
            selectedCategory: category
        });
    },

    validateAddressInput: function(){
    	console.log("validating address")
    	return false;
    },

	render: function(){
		 // form tagista onSubmit={event.preventDefault()}, otettu pois, (bugas firefoxissa)
		return (
			<div className='right-container'>
				<h2 className="centeredHeader">Create new event</h2>
				<form className='form' id='form' role='form'>

					{/* Name */}
					<div className='form-group'>
						<span htmlFor='name'>Name *</span>
						<input type='text' className='form-control' id='name'/>
					</div>
					<div className='form-group'>
						<span htmlFor='address'>Address *</span>
						<div className='input-group'>
							<input type='text' value={this.state.address.streetAddress} onBlur={this.addressOnBlur} onChange={this.handleChange('address')} data-checkaddress='checkaddress' className='form-control' id='address' placeholder='Fill address here or click on the map' required/>
							<span className="input-group-addon add-on white-background" onClick={this.fillInAddress}>
								 <span className="glyphicon glyphicon-search"></span>
							</span>
						</div>
					</div>

					{/* Date */}
					<div className='form-group required'>
						<span htmlFor='date'>Date *</span>
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

					{/* Category */}
					<div className='form-group'>
 						<span for="category-select-eventform">Category</span>
 						<Dropdown 
 							useBootstrap={true}
 							selectDivId="category-select-eventform"
 							categoriesContentId="category-content-eventform"
 							dropdownId="category-dropdown-eventform"
 							list={this.state.categories} selectCategory={this.selectCategory} 
 							selected={this.state.selectedCategory}
 						/> 						
 					</div>

					{/* Time */}
					<div className='form-group'>
						<span htmlFor='time'>Time *</span>
						<div className='input-group'>
							<input type='text' className='form-control' id='time' placeholder="hh:mm"/>
							<span className="input-group-btn">
								 <button className="btn btn-default" type="button" onClick={this.setCurrentTime}><i className="glyphicon glyphicon-time"></i></button>
							</span>
						</div>
					</div>

					{/* Description */}
					<div className='form-group'>
						<span htmlFor='description'>Description *</span>
						<input type='text' className='form-control' id='description'/>
					</div>

					{/* Submit */}
					<div className="form-group">
			            <button type="submit" className="btn btn-default">Submit</button>
				    </div>
			
				</form>
			</div>
		)
	}

});

module.exports = EventForm;