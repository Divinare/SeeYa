var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;

var SingleSelectDropdown = require('../singleSelectDropdown.js');
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

const EventForm = React.createClass({
    getInitialState: function() {
	    return {
	    	event: null,
	    	name: "",
	    	streetAddress: "",
	    	city: null,
	    	country: null,
	    	zipCode: null,
	    	latLng: {},
	    	date: Moment(), // unix_timestamp
	    	selectedDay: null,
	    	selectedCategory: "", //TODO: get the default category from backend
	    	time: "",
	    	description: "",
	    	categories: [],
	    	loadingEvent: false,
            loadingUser: false,
            infoWindow: null,
            syncAddress: true,
            changeListener: null
	    };
	},
	
	componentWillMount: function() {
	},

	componentDidUpdate: function(prevProps, prevState) {
        var that = this;
        var newEventMarker = this.props.newEventMarker;
        var prevEventMarker = prevProps.newEventMarker;

        //If the event marker was previously null but not anymore, add a dragend listener on it
        //Add also listener to the marker so that we can toggle showing the infowindow
        if(newEventMarker != null && 
            !$.isEmptyObject(newEventMarker) && 
            newEventMarker.map != null &&
            (prevProps == null || prevEventMarker == null || $.isEmptyObject(prevEventMarker) ) &&
            this.isMounted())  {

            google.maps.event.addListener(newEventMarker, 'dragend', function(evt) {
                if(that.state.syncAddress){
                    that.codeAddressFromLatLng(evt.latLng, that.afterGeocoding);
                }else{
                    that.setState({
                        latLng: evt.latLng
                    });
                }
            });

            google.maps.event.addListener(newEventMarker, 'click', function(evt) {
                if(that.state.infoWindow != null){
                    if(that.state.infoWindow.getMap() == null){
                        that.state.infoWindow.open(map, newEventMarker)
                    }else{
                        that.state.infoWindow.close()
                    }
                }
            });
        }       

        //If we have now loaded the event and user, check that the user has rights to edit the event
        if(!this.state.loadingEvent && 
            !this.state.loadingUser && 
            (prevState == null || prevState.loadingEvent || prevState.loadingUser)
            ){
            var user = this.props.getAppStatus('user')
            if( user.id !== this.state.event.creator ){
                that.clearNewEventMarker();
                msgComponent.showMessageComponent('Event can only be modified by its creator', constants.SHOW_MSG_MS_DEFAULT, 'error')
                browserHistory.push('/')
            }
        }

        //In edit form set the date in the input field if we have a different date in state than in the date input
        if( document.getElementsByClassName("dateInputField")[0] != null &&
            document.getElementsByClassName("dateInputField")[0].getElementsByClassName("form-control")[0] != null &&
            this.readDateFromInputField() != null &&
            this.state.date != null 
            ){
                if(this.state.date.format('DD.MM.YYYY') != this.readDateFromInputField().format('DD.MM.YYYY')){
                    console.log("CHANGING DATE")
                    var momentStr = this.state.date.format('DD.MM.YYYY')
                    document.getElementsByClassName("dateInputField")[0].getElementsByClassName("form-control")[0].value = momentStr;
                }
        }
	},
                
	componentDidMount: function() {
        this.setToolbarIcons();
		var that = this;
		this.props.handleResize();
        this.clearNewEventMarker();     //just in case because for some reason there is a marker with map null when coming through the edit link here
		if(this.isEditForm()){
			var error = function(){
				//there was an error fetching the event, maybe it has been deleted. For now just redirect to home page
				that.clearNewEventMarker();
                browserHistory.push('/')	
			}
			this.setState({
				loadingEvent: true
			});
			UTILS.rest.getEntry('event', that.props.params.id, that.autoFillEventDetails, error);
		}else{
            this.createFirstClickListener();
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

    updateLoggedInUser: function(){
        var that = this;
        var success = function(result) {
            if(that.isMounted()){
                that.props.updateAppStatus('user', result.user);
                that.setState({
                    loadingUser: false,
                })
            }
        }
        var error = function( jqXhr, textStatus, errorThrown ){
            if(that.isMounted()){
                that.props.updateAppStatus('user', null);
                that.setState({
                    loadingUser: false
                })
            }
            that.clearNewEventMarker();
            msgComponent.showMessageComponent('Please login first', constants.SHOW_MSG_MS_DEFAULT, 'error')
            browserHistory.push("/login");
        }
        this.setState({
            loadingUser: true
        })
        UTILS.rest.authorization("loggedInStatus", success, error);
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
        console.log("INITING AUTOCOMPLETE")
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
            if(that.state.syncAddress){
                that.codeAddressFromString();
            }else{
                that.setState({
                    streetAddress: document.getElementById('address').value
                })
            }
        }, 100);
    },

	// Gets address from input field and tries to get the corresponding address information
	codeAddressFromString: function() {
		var that = this;
	    var address = document.getElementById('address').value

	    geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var address_components = results[0];
				var newAddress = that.getAddressFromAddressComponents(address_components);
				var updatedAddress = that.getUpdatedAddress(newAddress);

				that.updateAddress(results[0].geometry.location, newAddress);
		   		that.centerAndSetMarker(results[0].geometry.location);

			} else {
				console.log("____ Geocode was not successful for the following reason: " + status);
                that.returnMarker();
                that.afterGeocoding(false, status);
			}
 		});
  	},

  	centerAndSetMarker: function(latLng){
        var that = this;
        var marker = this.props.newEventMarker;
        if(marker == null || marker.map == null) {
            map.setCenter(latLng);
            marker = new google.maps.Marker({
                map: map,
                position: latLng,
                animation: google.maps.Animation.DROP,
                draggable: true
            });
            var icon = new google.maps.MarkerImage("../../assets/marker_new_event.png", null, null, null, new google.maps.Size(24,29));
            marker.setIcon(icon);
            google.maps.event.addListener(marker, 'dragend', function(evt){
                if(that.state.syncAddress){
                     that.codeAddressFromLatLng(evt.latLng, that.afterGeocoding);
                }
            });
            var infoWindow = this.createInfoWindow();
            infoWindow.open(map, marker);
            this.props.updateAppStatus("newEventMarker", marker);
        }
        map.setCenter(latLng);
        marker.setPosition(latLng);
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

    /**
        Finds the address from latLng and updates it into state.
        If no address is found a message is shown to the user and the marker is returned where it was before (or 
        deleted if there was no marker)
        Calls the function in the callBack parameter if given and passes a boolean to indicate whether an address
        was found. Also the status code gotten from google maps is passed to the callback
    **/
	codeAddressFromLatLng: function(latLng, callBack) {
		var that = this;
		geocoder.geocode({'location': latLng}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var newAddress = that.getAddressFromAddressComponents(results[0]);
					var updatedAddress = that.getUpdatedAddress(newAddress);
					that.updateAddress(latLng, updatedAddress);
                    if( callBack != null ){
                        callBack(true, status);
                    }
				} else {
					console.log("____ No address found from latLng")
                    msgComponent.showMessageComponent('Could not find any address there, please try again', constants.SHOW_MSG_MS_DEFAULT, 'error')
				    that.returnMarker();
                    if( callBack != null ){
                        callBack(false, status);
                    }
                }
			} else {
				console.log('____ Geocoder failed due to: ' + status);
                if(status === google.maps.GeocoderStatus.ZERO_RESULTS){
                    //msgComponent.showMessageComponent('Could not find any address there, please try again', constants.SHOW_MSG_MS_DEFAULT, 'error')
                }
                else if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
                    //msgComponent.showMessageComponent('Cannot find addresses this fast, please wait a few seconds and try again', constants.SHOW_MSG_MS_DEFAULT, 'error')
                }
                that.returnMarker();
                if( callBack != null ){
                    callBack(false, status);
                }
			}
		});
	},

	getAddressFromAddressComponents: function(geocodingResult) {
        var address_components = geocodingResult.address_components;
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
                if (addressObj.types[j] === 'locality') {
                    newAddress.city = addressObj.long_name;
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
	    newAddress.streetAddress = geocodingResult.formatted_address;
	   /* if( streetNumber != null && typeof newAddress.streetAddress != 'undefined' 
	    	&& newAddress.streetAddress != null ){
	    	newAddress.streetAddress = newAddress.streetAddress + " " + streetNumber
	    }*/
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

    //returns marker to original position. Used if geocoding doesn't find any address from where the user
    //put the marker
    returnMarker: function(){
        var that = this;

        if($.isEmptyObject(this.state.latLng)){ //there was no marker before
            //remove the marker and add again firstclicklistener
            this.clearNewEventMarker();
            this.createFirstClickListener();
        }

        if( this.props.newEventMarker != null && this.state.latLng != null && !$.isEmptyObject(this.state.latLng) ){
            this.props.newEventMarker.setPosition(this.state.latLng)
        }
    },

    /**
        Creates a listener that geocodes the address when the user clicks the map for the first time
        The click listener is removed from the map after the marker has been added.
    **/
    createFirstClickListener: function(){
        var that = this;
            var firstClickListener = google.maps.event.addListener(map, 'click', function(event) {
                if(that.isMounted()){
                    var showErrorAndCreateInfoWindow = function(addressFound, status){
                        if(addressFound){
                            var infowindow = that.createInfoWindow();
                            infowindow.open(map, that.props.newEventMarker);
                            that.afterGeocoding(addressFound, status);
                        }
                    };
                    that.codeAddressFromLatLng(event.latLng, showErrorAndCreateInfoWindow);
                    google.maps.event.removeListener(firstClickListener);
                }
            });
    },  

    _handleInfoWindowClick: function(event) {
        var checked = !this.state.syncAddress;
        this.setState({
            syncAddress: checked,
        })
        if(checked) {
            $("#syncAddress").html("[ON]");
            $("#syncAddress").addClass("syncAddressOn");
            $("#syncAddress").removeClass("syncAddressOff");
        } else {
            $("#syncAddress").html("[OFF]");
            $("#syncAddress").addClass("syncAddressOff");
            $("#syncAddress").removeClass("syncAddressOn");
        }
    },

    _renderInfoWindow: function(){
        return (
            <div className="eventFormInfowindowContainer">
                <div>Drag and drop me</div>
                <div id="eventFormCheckboxContainer">                    
                <div id="syncAddressText" onClick={this._handleInfoWindowClick}>Auto sync with address <span id="syncAddress" className="syncAddressOn">[ON]</span></div>
                </div>
            </div>
        )
    },


    createInfoWindow: function(map, marker, event) {
        var that = this;
        var infowindowContent = '';
        var infowindowContainer = document.createElement('div');
        ReactDOM.render(this._renderInfoWindow(event), infowindowContainer );

        var infoWindow = new google.maps.InfoWindow({
            content: infowindowContainer
        });
        
        if(this.isMounted()){
            this.setState({
                infoWindow: infoWindow
            })
        }
        
        return infoWindow;
    },

    afterGeocoding: function(addressFound, status){    //show error message if no address found by the geocoder
        if( !addressFound ){
            this.showNoAddressFoundError(status);
        }
    },

    showNoAddressFoundError: function(status){
        if( status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT ){
            msgComponent.showMessageComponent('Cannot find addresses this fast, please wait a few seconds and try again', constants.SHOW_MSG_MS_DEFAULT, 'error')
        } else {
            msgComponent.showMessageComponent('Could not find any address there, please try again', constants.SHOW_MSG_MS_DEFAULT, 'error')
        }
    },

	// Called when editing event
	autoFillEventDetails: function(event) {
        if(this.isMounted()){
    		var moment = Moment(event.timestamp, "x");	//x for unix ms timestamp
    		var time = moment.format("HH:mm");
    		moment.hour(0);
    		moment.minute(0);

            this.selectCategory(name);
            $("#singleSelectInput").val(event.Category.name);

    		var latLng = new google.maps.LatLng(event.lat,event.lon);

    		this.setState({
    			event: event,
    			name: event.name,
    			latLng: latLng,
    			streetAddress: event.Address.streetAddress,
    			city: event.Address.city,
    			country: event.Address.country,
    			zipCode: event.Address.zipCode,
    			time: time,
    		  	date: moment,
    			description: event.description,
    			selectedCategory: event.Category.name,
                loadingEvent:false
    		});
            if(this.isMounted()){
                this.centerAndSetMarker(latLng);
                this.initAutocomplete();
            }
        }
	},

	/*** DATE ***/

    handleNewDateChange: function(timestamp) {
    	if(timestamp == "Invalid date") {
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
			return moment;
		} else {
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
					var distance = Math.abs(topDateSelect-topCalendar)-263; // NOTE: This value needs to be changed if the date selecting field doesn't position to a right spot!
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
            if(that.isMounted()){
                that.setState({
                    categories: categories
                })
            }

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

        // Clear/hide errorfields:
        $("#submitErrorField").css("display", "none");

		var address = {
			streetAddress: this.state.streetAddress,
			city: this.state.city,
			country: this.state.country,
			zipCode: this.state.zipCode,
		}
		var latLng;
		if(this.state.latLng == null || $.isEmptyObject(this.state.latLng)) {
			latLng = [];
		} else {
			latLng = [this.state.latLng.lat(), this.state.latLng.lng()];
		}

		var name = this.state.name;

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
		var valid3 = validator.validateField(commonValidator.validateEventLatLng, latLng, "#latLng", "#latLngError");
		var valid4 = validator.validateField(commonValidator.validateEventDate, dateTimestamp, "#date", "#dateError");
		var valid5 = validator.validateField(commonValidator.validateEventCategory, category, "#category", "#categoryError", "Select category from the list");
		var valid6 = validator.validateField(commonValidator.validateEventTime, [time, dateTimestamp], "#time-container", "#timeError");
		var valid7 = validator.validateField(commonValidator.validateEventDescription, description, "#description", "#descriptionError", "");

		// If one of the validations fail, prevent submitting form
		if(!valid1 || !valid2 || !valid3 || !valid4 || !valid5 || !valid6 || !valid7) {
			console.log("____  form INVALID " + valid1 + valid2 + valid3 + valid4 + valid5 + valid6 + valid7);
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
            validator.setErrorToField(".submitError", jqXhr.responseJSON.errors, "#submitErrorField");
            $("#submitErrorField").css("display", "block");
            // Scrolls to bottom of the eventForm so that the user can see the error
            $('#rightContainerContent').scrollTop($('#rightContainerContent')[0].scrollHeight);
		};

		var returnHome = function(){
			that.props.getEvents();
            that.clearNewEventMarker();
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
		        //that.props.addEventToFilteredEventList(createdEventData);
		        returnHome();
                msgComponent.showMessageComponent('Event created successfully', constants.SHOW_MSG_MS_DEFAULT, 'success')
			};
			UTILS.rest.addEntry('event', eventData, success, error);
		}
	},

    clearNewEventMarker: function(){
        if( this.props.newEventMarker != null && !$.isEmptyObject(this.props.newEventMarker) ){
            if(this.state.infoWindow != null){
                this.state.infoWindow.setMap(null);
            }
            this.props.newEventMarker.setMap(null);
        }
        this.props.updateAppStatus('newEventMarker', null);
    },

	getEditOrCreateTitle: function(){
		if(this.isEditForm()){
			return "Edit event"
		}
		return "What would you like to do?"
	},

	render: function(){
		var that = this;

		if(this.state.loadingEvent){
			return <div>Loading...</div>
		}

		return (
			<div id="eventFormContainer">
				<h2 className="centeredHeader">{that.getEditOrCreateTitle()}</h2>

				<div className='form' id="eventForm">

					{/* Name */}
					<div className='form-group'>
						<input type='text' className='form-control' id='name' value={this.state.name} onChange={this.handleChange('name')} placeholder='Event name' autoComplete="off"/>
					</div>
					<span className="validationError" id="nameError"></span>

					{/* Address */}
					<div className='form-group'>
						<input type='text' value={this.state.streetAddress} onBlur={this.addressOnBlur} onChange={this.handleChange('streetAddress')} data-checkaddress='checkaddress' className='form-control' id='address' placeholder='Fill address here or click on the map' />
                    </div>
					<span className="validationError" id="addressError"></span>
					<span className="validationError" id="latLngError"></span>

					{/* Category */}
					<div className='form-group' id="category">
							<SingleSelectDropdown
                                inputFieldId={"categoryInputField"}
                                multipleColumns={true}
								list={this.state.categories}
                                select={this.selectCategory} 
								selected={this.state.selectedCategory}
                                scrollTopPosition={50} /> 						
						</div>
					<span className="validationError" id="categoryError"></span>

					{/* Date */}
					<div className='form-group' id='date'>
				        <div className="dateInputField">

							<DatePicker
                               // ref={'dateComponent'}
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
						<div className='input-group' id='time-container'>
							<input type='text' className='form-control' id='time' value={this.state.time} onChange={this.handleChange("time")} placeholder="Time (hh:mm)" autoComplete="off" />
							<span className="input-group-btn">
								 <button className="btn btn-default" type="button" onClick={this.setCurrentTime}><i className="glyphicon glyphicon-time"></i></button>
							</span>
						</div>
					</div>
					<span className="validationError" id="timeError"></span>

					{/* Description */}
					<div className='form-group'>
						<textarea type='text' className='form-control' id='description' maxLength="2500" value={this.state.description} onChange={this.handleChange('description')} placeholder="Description" />
					</div>
					<span id="charactersLeft"></span>

                    <div className="submitError" id="submitErrorField"></div>

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