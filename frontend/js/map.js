var React = require('react');

var GoogleMapsLoader = require('google-maps');
var $ = require('jquery');
//var Map = ReactGoogleMaps.Map;
//var Marker = ReactGoogleMaps.Marker;

//var markers = [];

var Map = React.createClass({

  getInitialState: function() {
    console.log("getInitialState");
        return {
            google: [],
            map: {},
            initialZoom: 8,
            mapCenterLat: 60,
            mapCenterLng: 20,
            markers: []
        };
    },
    componentDidMount: function () {
        this.initMap();
    //    this.initMarkers(this.props, null);
    },

    componentWillReceiveProps: function(nextProps) {
        console.log("map will receive props");
        console.log(this.state.google);
        console.log(nextProps);
        if(this.state != null && nextProps.filteredEventList.length > 0) {
            console.log("hmm???????????")
            this.deleteAllMarkers();
            this.initMarkers(nextProps, this.state.map, this.state.google);
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
            console.log("GGGGGGGGGGGGGGGg");
            console.log(google);

            var map = new google.maps.Map(that.getDOMNode(), mapOptions);

            that.setState({
                map: map,
                google: google
            });
          //  that.initMarkers(that.props, map, google);

            //   var marker = new google.maps.Marker({position: that.mapCenterLatLng(), title: 'Hi', map: map});
            google.maps.event.addListener(map, 'click', function(event) {
                console.log("ADD MARKER");
                console.log(google);
                that.addMarker(event.latLng, map, google);
            });


        });

    },

    initMarkers: function(props, map, google) {
        console.log("google: ");
        console.log(google);
        var that = this;
        var filteredEventList = props.filteredEventList;

        console.log("filt:");
        console.log(filteredEventList);
        filteredEventList.map(function(event) {
            if(!$.isEmptyObject(event)) {
                console.log("google?!?!?!");
                console.log(google);
               that.addMarker({ lat: event.lat, lng: event.lon }, map, google);
            } else {
                console.log("critical error in map.js maybe.");
            }
        });

    },

    addMarker: function(location, map, google) {
        console.log("google");
        console.log(google);
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        that.setState((state) => {
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