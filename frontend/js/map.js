var React = require('react');

var GoogleMapsLoader = require('google-maps');
var $ = require('jquery');
//var Map = ReactGoogleMaps.Map;
//var Marker = ReactGoogleMaps.Marker;

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
        var eventList = this.props.eventList;
        eventList.map(function(event) {
            that.addMarker({ lat: event.lat, lng: event.lon }, map);
        });

    },

    addMarker: function(location, map) {
        console.log(location);
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    },

    render: function(){
        return (
          <div id="map-canvas"></div>
        )
    }

});

module.exports = Map;