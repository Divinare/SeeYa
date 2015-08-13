var React = require('react');
var Router = require('react-router');
var Parser = require('../utils/eventParser');

var CreateNewEventPopup = require('./createNewEventPopup.js');
// https://developers.google.com/maps/documentation/javascript/examples/marker-animations

var Map = React.createClass({
    mixins: [ Router.Navigation ],

    getInitialState: function() {
        console.log("getInitialState");

        return {
            map: {},
            initialZoom: 8,
            mapCenterLat: 60,
            mapCenterLng: 20,
            markers: [],
            openedInfowindow: {},
            newEventMarker: {}
        };
    },
    componentDidMount: function () {
        var map = this.initMap();

        this.addAllMarkers(this.props, map);
    },

    componentWillReceiveProps: function(nextProps) {
        this.deleteMarkers(this.state.markers);
        console.log("map will receive props");
        if(this.state != null && nextProps.filteredEventList.length > 0) {
            console.log(nextProps);
            
            this.addAllMarkers(nextProps, this.state.map);
        }
        
    },

    mapCenterLatLng: function () {
        console.log("map center lat lng");
        /*
        var props = this.props;
        GoogleMapsLoader.load(function(google) {
          return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
        });
*/
    },

    initMap: function() {

        var that = this;

        var mapOptions = {
            center: { lat: 60.205294, lng: 24.936092},
            zoom: 5,
            minZoom: 3
        };
        console.log(google);

        var map = new google.maps.Map(this.getDOMNode(), mapOptions);
        this.setState({
            map: map
        });

        google.maps.event.addListener(map, 'click', function(event) {
            that.addEventMarker(event.latLng, map);
        });

        google.maps.event.addListener(map, 'rightclick', function(event) {
            that.closeOpenedInfowindow();
            that.deleteNewEventMarker();
        });

        return map;
     },

    addAllMarkers: function(props, map) {
        var that = this;
        var filteredEventList = props.filteredEventList;

        filteredEventList.map(function(event) {
            if(!$.isEmptyObject(event)) {
                var marker = that.createMarker({ lat: event.lat, lng: event.lon }, map);
                var infowindow =  that.createInfowindow(map, marker, event);
                google.maps.event.addListener(marker, 'click', function() {
                    that.openInfowindow(map, marker, infowindow);
                    that.deleteNewEventMarker();
                });


                that.setState((state) => {
                    markers: state.markers.push(marker);
                });
            } else {
                console.log("critical error in map.js maybe.");
            }
        });


    },

    transitionToEventForm: function() {
        console.log('event form transition');
        this.transitionTo('eventForm', {id: 10});
    },

    addEventMarker: function(latLng, map) {
        var that = this;
        var icon = 'http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png';
        var marker = this.createMarker(latLng, map, icon);
        var infowindow =  this.createInfowindow(map, marker, null);
        this.openInfowindow(map, marker, infowindow);
        google.maps.event.addListener(marker, 'click', function() {
            // TODO: go to eventform
        });

        //var pt = new google.maps.LatLng(lat, lng);
     //   map.setCenter(latLng);
     //   map.setZoom(8);

        google.maps.event.addListener(infowindow, 'closeclick', function () {
            that.deleteMarker(marker);
        });

        var currentEventMarker = this.props.newEventMarker;
        console.log(currentEventMarker);
        if(!$.isEmptyObject(currentEventMarker)) {
            this.deleteMarker(currentEventMarker);
        }
       // this.props.updateNewEventMarker(marker);
        this.props.updateAppStatus('newEventMarker', marker);
    },

    createMarker: function(location, map, icon) {
        var that = this;
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        if(typeof icon != 'undefined') {
            marker.setIcon(icon);
        }

        return marker;
    },

    createInfowindow: function(map, marker, event) {
        var that = this;
        var infowindowContent = '';
        if(event == null) {
            var infowindowContent = document.createElement('div');
            infowindowContent.className = "link";
            infowindowContent.innerHTML = 'Create new event here';
            infowindowContent.onclick = function(){
                that.transitionToEventForm();
            };



        } else {
            var time = Parser.getValue(event, 'timestamp');
            var streetAddress = Parser.getValue(event, 'streetAddress');
            var attendances = Parser.getValue(event, 'attendances');
            infowindowContent = '<h3>' + event.name + '</h3>'
                            + '<a> Join to this event</a>'
                            + '<p>' + time + '</p>'
                            + '<p>' + streetAddress + '</p>'
                            + '<p>Attendances: ' + attendances + '</p>'
                            + '<a>Zoom on map </a>';
        }

        var infowindow = new google.maps.InfoWindow({
            content: infowindowContent
        });
        return infowindow;

       // google.maps.event.addListener(marker, 'click', function() {
     //       that.openInfowindow(map, marker, infowindow);
     //   });
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
        this.deleteMarker(marker);
        // Also empty the newEventMarker
        this.setState({
            newEventMarker: {}
        })
    },

    render: function(){
 
        return (
            <div id="map-canvas" className="col-md-6"></div>
        )
    }

});

module.exports = Map;