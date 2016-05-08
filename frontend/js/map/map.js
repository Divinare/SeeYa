var React = require('react');
var Router = require('react-router');
var browserHistory = Router.browserHistory;

var Moment = require('moment')
var Router = require('react-router');
var ContextMenu = require('./contextMenu.js');

var CreateNewEventPopup = require('./createNewEventPopup.js');

//import { browserHistory } from 'react-router'

var Map = React.createClass({
    mixins: [ Router.Navigation ],

    getInitialState: function() {

        return {
            initialZoom: 10,
            mapCenterLat: 60,
            mapCenterLng: 20,
            openedInfowindow: {},
            eventMarkers: []
        };
    },
    componentDidMount: function () {
        this.initMap();
        this.props.handleResize();
    },

    componentWillReceiveProps: function(nextProps) {
        var that = this;
        //this.deleteMarkers(this.state.markers);

        var location = UTILS.helper.getLocation();
        var allowDrawMarkers = !(location === 'eventForm' || location === 'editForm');

        if(this.state != null && typeof nextProps.filteredEventList != "undefined" &&
           nextProps.filteredEventList.length > 0) {
                    
            if(allowDrawMarkers) {
                var newEventMarker = this.props.newEventMarker;
                if(!$.isEmptyObject(newEventMarker)) {
                    this.props.newEventMarker.setMap(null);
                }

                var drawEventMarker = (!$.isEmptyObject(nextProps.shownEventData)) ? true :  false
                if(drawEventMarker) {
                    this.deleteEventMarkers(this.state.eventMarkers);
                    this.addEventMarker(nextProps.shownEventData);
                } else {
                    this.syncFilteredMarkers(nextProps);
                }
                window.markersHaventLoaded = false;
            } else {
                this.deleteEventMarkers(this.state.eventMarkers);
            }
        } else {
            this.deleteEventMarkers(this.state.eventMarkers);
        }
    },

    _zoomControl: function(controlDiv, map) {
        controlDiv.className = "mapControlDiv";
        var controlWrapper = document.createElement('div');
        controlWrapper.className = "mapControlWrapper";
        controlDiv.appendChild(controlWrapper);

        var zoomInButton = document.createElement('div');
        zoomInButton.className = "mapZoomInButton";
        zoomInButton.innerHTML = '+';
        controlWrapper.appendChild(zoomInButton);

        var zoomOutButton = document.createElement('div');
        zoomOutButton.className = "mapZoomOutButton";
        zoomOutButton.innerHTML = '-';
        controlWrapper.appendChild(zoomOutButton);

        // Setup the click event listener - zoomIn
        google.maps.event.addDomListener(zoomInButton, 'click', function() {
            map.setZoom(map.getZoom() + 1);
        });

        // Setup the click event listener - zoomOut
        google.maps.event.addDomListener(zoomOutButton, 'click', function() {
            map.setZoom(map.getZoom() - 1);
        });  
    },

    initMap: function() {
        var that = this;

        var mapOptions = {
            center: { lat: 60.205294, lng: 24.936092},  //TODO center to user's location?
            zoom: this.state.initialZoom,
            minZoom: 5,
            maxZoom: 17,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            name: "Dummy Style"
        };

        var map = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);       
        
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new this._zoomControl(zoomControlDiv, map);
        zoomControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);
        
        google.maps.event.addListener(map, 'click', function(event) {
            that.closeOpenedInfowindow();
            if(UTILS.helper.isAtLocation("eventForm")) {
                var newEventMarker = that.props.newEventMarker;
                if(newEventMarker == null) {
                    that.addNewEventMarker(event.latLng, map);
                } else {
                    // if !newEventMarker doesn't exist on map
                    if(newEventMarker.getMap() == null) {
                        that.addNewEventMarker(event.latLng, map);
                    }
                }
            }
            if( !UTILS.styleHelper.isDesktop() ){
               UTILS.styleHelper.hideRightContainer(); 
            }
            
        });

        var location = UTILS.helper.getLocation();
        if( location !== 'editForm' ){
            this.centerMapToUserLocation();
        }

        google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
            if(UTILS.styleHelper.isDesktop()) {
                UTILS.styleHelper.toggleRightContainer();
            }
        });

        google.maps.event.addListener(map, 'bounds_changed', function(){
            that.props.automaticFilterEventsByLocation();
        });

        window.map = map;
    },

    centerMapToUserLocation: function() {
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.centerMapLocation);
        } else {
            console.log("____ Geolocation is not supported by this browser.");
        }
    },
    
    centerMapLocation: function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var latLng = new google.maps.LatLng(lat, lon);
        map.setCenter(latLng);
    },

    // Syncs filteredEventList and this.state.eventMarkers and also adds/removes markers on map
    syncFilteredMarkers: function(props) {
        /*
            If event in filteredEventList is already in this.state.eventMarkers,
                - no need to push it on map, keep it in this.state.eventMarkers
            else
                -  push it on map, add it in this.state.eventMarkers

            If event in this.state.eventMarkers is not in filteredEventList
                - remove it from the map (it gets removed from state in the function above)
            
        */

        var that = this;
        var filteredEventList = props.filteredEventList;
        var newEventMarkers = [];
        var existingEventMarkers = this.state.eventMarkers;

        var existingEventMarkersObj = {};
        existingEventMarkers.map(function(eventMarker){
            existingEventMarkersObj[eventMarker.id] = eventMarker;
        });

        filteredEventList.map(function(event) {
            if(!$.isEmptyObject(event)) {
                if(existingEventMarkersObj[event.id] != null) {
                    newEventMarkers.push(existingEventMarkersObj[event.id])
                } else {
                    var marker = that.createMarkerForEvent(event);
                    event.marker = marker;
                    newEventMarkers.push(event);
                }
            } else {
                console.log("___ Programmer! Critical error in map.js maybe.");
            }

        });

        var tempNewEventMarkers = {}
        newEventMarkers.map(function(newEventMarker) {
            tempNewEventMarkers[newEventMarker.id] = newEventMarker;
        });
        // Remove eventMarkers that are in existingEventMarkers but not in newEventMarkers
        existingEventMarkers.map(function(eventMarker) {
            if(tempNewEventMarkers[eventMarker.id] == null) {
                that.deleteEventMarker(eventMarker);
            }
        });
                    
        if(!$.isEmptyObject(newEventMarkers)) {
            this.setState({
                eventMarkers: newEventMarkers
            })
        }
    },

    addEventMarker: function(event) {
        var createdMarkers = [];
        var marker = this.createMarkerForEvent(event);
        createdMarkers.push(marker);
        if(!$.isEmptyObject(createdMarkers)) {
            this.setState({
                markers: createdMarkers
            })
        }
    },

    createMarkerForEvent: function(event) {
        var that = this;
        var icon = new google.maps.MarkerImage("../../assets/marker_gatherup_straight.png", null, null, null, new google.maps.Size(24,29));
        var marker = this.createMarker({ lat: event.lat, lng: event.lon }, window.map, icon, false);
        var infowindow =  this.createInfowindow(window.map, marker, event);
        google.maps.event.addListener(marker, 'click', function() {
            that.openInfowindow(window.map, marker, infowindow);
        });
        return marker;
    },

    transitionToEventForm: function() {
        this.transitionTo('eventForm', {id: 10});
    },

    addNewEventMarker: function(latLng, map) {
        var that = this;
        var icon = new google.maps.MarkerImage("assets/marker_new_event.png", null, null, null, new google.maps.Size(24,29));
        var marker = this.createMarker(latLng, map, icon, true, true);

        // Delete current eventMarker if there is one
        if(this.props.newEventMarker != null) {
            this.deleteMarker(this.props.newEventMarker);
        }
        // Update the new eventMarker
        this.props.updateAppStatus('newEventMarker', marker);
    },

    createMarker: function(location, map, icon, draggable, showAnimation) {
        var addAnimation = (window.markersHaventLoaded == true) ? true : false;
        if(showAnimation) {
            addAnimation = true;
        }
        var marker;
        if(addAnimation) {
            marker = new google.maps.Marker({
                position: location,
                draggable: draggable,
                animation: google.maps.Animation.DROP,
                map: map
            });
        } else {
            marker = new google.maps.Marker({
                position: location,
                draggable: draggable,
                map: map
            });
        }

        if(typeof icon != 'undefined') {

            marker.setIcon(icon);
        }
        return marker;
    },

    _handlePopupLinkClick: function(linkName, eventId) {
        if(linkName == "join") {
            if(UTILS.helper.urlTokenExistsInUrl("join")) {
                // Already at joinPage
            } else {
                browserHistory.push("/join/" + eventId);
            }
        } else if(linkName == "showEvent") {
            if(UTILS.helper.urlTokenExistsInUrl("events")) {
                // Already at eventPage
            } else {
                browserHistory.push('/events/' + eventId);
            }

        }
    },

    _renderInfoWindow: function(event) {
        var unixTimestamp = UTILS.eventParser.getValue(event, 'timestamp');
        var date = Moment.unix(unixTimestamp/1000).format("DD.MM.YYYY");
        var hours = Moment.unix(unixTimestamp/1000).format("HH:mm")
        var time = date + " " + hours;

        var streetAddress = UTILS.eventParser.getValue(event, 'streetAddress');
        var attendances = UTILS.eventParser.getValue(event, 'attendances');

        return (
            <div className="infowindowContainer">
                <div id="popupTopic" className="link" onClick={this._handlePopupLinkClick.bind(null, "showEvent", event.id)}>{event.name}</div>
                <div className="popupListItem">{time}</div>
                <div className="popupListItem">{streetAddress}</div>
                <div className="popupListItem"><span id="popupPeopleIcon"></span><span id="popupPeopleAttendingText"> attending: {attendances}</span></div>
                <div id="popupJoinLink" className="popupListItem link" onClick={this._handlePopupLinkClick.bind(null, "join", event.id)}>Join to this event</div>
            </div>
        )
    },

    createInfowindow: function(map, marker, event) {
        var that = this;
        var infowindowContent = '';
        var infowindowContainer = document.createElement('div');
        ReactDOM.render(this._renderInfoWindow(event), infowindowContainer );
        //infowindow.setContent( div );

        var infowindow = new google.maps.InfoWindow({
            content: infowindowContainer
        });
        return infowindow;
    },

    openInfowindow: function(map, marker, infowindow) {
        this.closeOpenedInfowindow();
        infowindow.open(map, marker);

        this.setState({
            openedInfowindow: infowindow
        });
    },

    closeOpenedInfowindow: function() {
        var openedInfowindow = this.state.openedInfowindow
        if(!$.isEmptyObject(openedInfowindow)) {
            openedInfowindow.close();
        }
     },


    deleteEventMarkers: function(eventMarkers) {
        eventMarkers.map(function(eventMarker) {
            eventMarker.marker.setMap(null);
        });
        this.setState({
            eventMarkers: []
        })
    },

    deleteEventMarker: function(eventMarker) {
        if(eventMarker == null) {
            console.log("___ Programmer! Tried to remove empty eventMarker");
            return;
        }
        if(eventMarker.marker == null) {
            console.log("___ Programmer! Tried to remove eventMarker without marker");
            return;
        }
        eventMarker.marker.setMap(null);
    },

    deleteMarker: function(marker) {
        marker.setMap(null);
    },

    deleteNewEventMarker: function() {
        
        var marker = this.props.newEventMarker;
        if(!$.isEmptyObject(marker)) {
            this.deleteMarker(marker);
            // Also empty the newEventMarker
                    console.log("REMOVING MARKER : deleteNewEventMarker");

            this.props.updateAppStatus('newEventMarker', {});
        } else {
        }
        
    },

    render: function(){
 
        return (
            <div id="map-canvas"></div>
        )
    }

});

module.exports = Map;