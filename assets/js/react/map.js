var React = require('react');
var L = require('leaflet');
//L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

//var ReactGoogleMaps = require('react-google-maps')
var GoogleMapsLoader = require('google-maps');
var $ = require('jquery');
//var Map = ReactGoogleMaps.Map;
//var Marker = ReactGoogleMaps.Marker;


/*
var GoogleMaps = require('google-maps');

var signupHeading = "Sign up for the event "
var chosenEvent = {};
var infowindow = new google.maps.InfoWindow();

GoogleMapsLoader.load(function(google) {
    new google.maps.Map(el, options);
});

var openInfoWindow;
var geocoder;
var myCenter = new google.maps.LatLng(51.508742, -0.120850);
var mapProp = {
    center: new google.maps.LatLng(60.1733244, 24.9410248), //start from helsinki
    zoom: zoomOutNoUserLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var markers = [];
var newEventMarker = null;
var GeoMarker;
var map;

*/

//import {GoogleMaps, Marker} from "react-google-maps";
var Map = React.createClass({

    getDefaultProps: function () {
        return {
            initialZoom: 8,
            mapCenterLat: 43.6425569,
            mapCenterLng: -79.4073126,
        };
    },
    componentDidMount: function (rootNode) {
        var that = this;
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644},
          zoom: 8
        };

        GoogleMapsLoader.load(function(google) {

          map = new google.maps.Map(that.getDOMNode(), mapOptions);
       //   var marker = new google.maps.Marker({position: that.mapCenterLatLng(), title: 'Hi', map: map});
          that.setState({map: map});
        });
    },
    mapCenterLatLng: function () {
        var props = this.props;
        GoogleMapsLoader.load(function(google) {
          return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
        });
    },

    initMap: function() {


    },

  render: function(){
    return (
      <div id="map-canvas"></div>
    )
  }

});

module.exports = Map;