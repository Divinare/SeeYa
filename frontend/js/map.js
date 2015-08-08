var React = require('react');

//var GoogleMapsLoader = require('google-maps');
var $ = require('jquery');
//var Map = ReactGoogleMaps.Map;
//var Marker = ReactGoogleMaps.Marker;

//var markers = [];

var Map = React.createClass({

    getInitialState: function() {
        console.log("getInitialState");

        return {
            map: {},
            initialZoom: 8,
            mapCenterLat: 60,
            mapCenterLng: 20,
            markers: []
        };
    },
    componentDidMount: function () {
        var map = this.initMap();

        this.addAllMarkers(this.props, map);
    },

    componentWillReceiveProps: function(nextProps) {
        this.deleteAllMarkers();
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
            zoom: 8
        };
        console.log(google);

        var map = new google.maps.Map(this.getDOMNode(), mapOptions);
        this.setState({
            map: map
        });

        google.maps.event.addListener(map, 'click', function(event) {
            that.addMarker(event.latLng, map);
        });

        return map;
     },

    addAllMarkers: function(props, map) {
        var that = this;
        var filteredEventList = props.filteredEventList;

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
        this.setState((state) => {
            markers: state.markers.push(marker);
        });
    },


    setAllMap: function(map) {
        var markers = this.state.markers;
        markers.map(function(marker) {
            marker.setMap(map);
        });
    },

    deleteAllMarkers: function() {
        this.setAllMap(null);
        this.setState({
            markers: []
        })
    },

    render: function(){
 
        return (
          <div id="map-canvas"></div>
        )
    }

});

module.exports = Map;