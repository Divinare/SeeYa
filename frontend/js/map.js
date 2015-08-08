var React = require('react');

var GoogleMapsLoader = require('google-maps');
var $ = require('jquery');
//var Map = ReactGoogleMaps.Map;
//var Marker = ReactGoogleMaps.Marker;

var markers = [];

var Map = React.createClass({

  getDefaultProps: function () {
        return {
            map: {},
            initialZoom: 8,
            mapCenterLat: 60,
            mapCenterLng: 20,
        };
    },
    componentDidMount: function () {
        this.initMap();
        this.initMarkers();
    },

    componentWillReceiveProps: function() {
        console.log("map will receive props");
        this.deleteMarkers();
        if(this.props.filteredEventList.length > 0) {
            this.initMarkers(this.state.map);
        }
    },

    mapCenterLatLng: function () {
        var props = this.props;
        GoogleMapsLoader.load(function(google) {
          return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
        });
    },

    initMap: function() {
        var that = this;
        var mapOptions = {
            center: { lat: 60.205294, lng: 24.936092},
            zoom: 8
        };

        GoogleMapsLoader.load(function(google) {
            var map = new google.maps.Map(that.getDOMNode(), mapOptions);
            that.initMarkers(map);

            //   var marker = new google.maps.Marker({position: that.mapCenterLatLng(), title: 'Hi', map: map});
            google.maps.event.addListener(map, 'click', function(event) {
                that.addMarker(event.latLng, map);
            });

            that.setState({map: map});
        });

    },

    initMarkers: function(map) {
        var that = this;
        var filteredEventList = this.props.filteredEventList;
        console.log("filt:");
        console.log(filteredEventList);
        filteredEventList.map(function(event) {
            if(!$.isEmptyObject(event)) {
               that.addMarker({ lat: event.lat, lng: event.lon }, map);
            } else {
                console.log("critical error in map.js maybe.");
            }
        });

    },

    addMarker: function(location, map) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    },


    setAllMap: function(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    },

    clearMarkers: function() {
        this.setAllMap(null);
    },

    deleteMarkers: function() {
        this.clearMarkers();
        markers = [];
    },

    render: function(){
        return (
          <div id="map-canvas"></div>
        )
    }

});

module.exports = Map;