var React = require('react');
var Moment = require('moment')
var Router = require('react-router');
var ContextMenu = require('./contextMenu.js');

var CreateNewEventPopup = require('./createNewEventPopup.js');
// https://developers.google.com/maps/documentation/javascript/examples/marker-animations

var Map = React.createClass({
    mixins: [ Router.Navigation ],

    getInitialState: function() {

        return {
            initialZoom: 10,
            mapCenterLat: 60,
            mapCenterLng: 20,
            openedInfowindow: {},
            markers: []
        };
    },
    componentDidMount: function () {
        this.initMap();
        this.props.handleResize();

        var allowDrawMarkers = !(location === 'eventForm' || location === 'editForm');
    },

    componentWillReceiveProps: function(nextProps) {
        var that = this;
        this.deleteMarkers(this.state.markers);

        var location = UTILS.helper.getLocation();
        var allowDrawMarkers = !(location === 'eventForm' || location === 'editForm');
        if(this.state != null && nextProps.filteredEventList.length > 0) {
            if(allowDrawMarkers) {
                this.addAllMarkers(nextProps);
                window.markersHaventLoaded = false;
                if(allowDrawMarkers) {
                    var newEventMarker = this.props.newEventMarker;
                    if(!$.isEmptyObject(newEventMarker)) {
                        console.log("SETTING OFF MARKER");
                        this.props.newEventMarker.setMap(null);
                        //this.props.updateAppStatus(newEventMarker, null);

                    }
                }

            }
        }

        if(nextProps.newEventMarker == null) {
            //console.log("removing new eventMarker!");
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
            mapTypeControl: false
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
        
        window.map = map;
    },

    centerMapToUserLocation: function() {
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.centerMapLocation);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    },
    
    centerMapLocation: function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var latLng = new google.maps.LatLng(lat, lon);
        map.setCenter(latLng);
    },

    addAllMarkers: function(props) {
        var that = this;
        var filteredEventList = props.filteredEventList;
        var createdMarkers = [];

        filteredEventList.map(function(event) {
            if(!$.isEmptyObject(event)) {
                var icon = new google.maps.MarkerImage("assets/marker_gatherup_straight.png", null, null, null, new google.maps.Size(24,29));
                var marker = that.createMarker({ lat: event.lat, lng: event.lon }, map, icon, false);
                var infowindow =  that.createInfowindow(map, marker, event);
                google.maps.event.addListener(marker, 'click', function() {
                    that.openInfowindow(map, marker, infowindow);
                    //that.deleteNewEventMarker();
                });
                createdMarkers.push(marker);



            } else {
                console.log("... Critical error in map.js maybe.");
            }
        });
                    
        if(!$.isEmptyObject(createdMarkers)) {
//            this.props.updateAppStatus('markers', createdMarkers);
            this.setState({
                markers: createdMarkers
            })
        }



    },

    transitionToEventForm: function() {
        this.transitionTo('eventForm', {id: 10});
    },

    addNewEventMarker: function(latLng, map) {
        console.log("addNewEventMarker map.js")
        var that = this;
        var icon = new google.maps.MarkerImage("assets/marker_gatherup_straight.png", null, null, null, new google.maps.Size(24,29));
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

    _renderInfoWindow: function(event) {
        var unixTimestamp = UTILS.eventParser.getValue(event, 'timestamp');
        var date = Moment.unix(unixTimestamp/1000).format("DD.MM.YYYY");
        var hours = Moment.unix(unixTimestamp/1000).format("HH:mm")
        var time = date + " " + hours;

        var streetAddress = UTILS.eventParser.getValue(event, 'streetAddress');
        var attendances = UTILS.eventParser.getValue(event, 'attendances');

        return (
            <div className="infowindowContainer">
                <div id="popupTopic">{event.name}</div>
                <p>{time}</p>
                <p>{streetAddress}</p>
                <p>People attending: {attendances}</p>
                <a>Attend</a>
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


      //  infowindow.open(map, this);

        /*
        var time = UTILS.eventParser.getValue(event, 'timestamp');
        var streetAddress = UTILS.eventParser.getValue(event, 'streetAddress');
        var attendances = UTILS.eventParser.getValue(event, 'attendances');
        infowindowContent = '<h3>' + event.name + '</h3>'
                        + '<a> Join to this event</a>'
                        + '<p>' + time + '</p>'
                        + '<p>' + streetAddress + '</p>'
                        + '<p>Attendances: ' + attendances + '</p>'
                        + '<a>Zoom on map </a>';

        var infowindow = new google.maps.InfoWindow({
            content: infowindowContent
        });
        */

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


    deleteMarkers: function(markers) {
        markers.map(function(marker) {
            marker.setMap(null);
        });
        this.setState({
            markers: []
        })
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