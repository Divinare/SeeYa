var React = require('react');
var Router = require('react-router');
var Parser = require('./utils/eventParser');
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
               that.addMarker({ lat: event.lat, lng: event.lon }, map, event);
            } else {
                console.log("critical error in map.js maybe.");
            }
        });


    },

    transitionToEventForm: function() {
        console.log('event form transition');
        this.transitionTo('eventForm');
    },

    addMarker: function(location, map, event) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        // http://stackoverflow.com/questions/12102598/trigger-event-with-infowindow-or-infobox-on-click-google-map-api-v3

        var markerContent = '';
        if(event == null) {
            markerContent = '<h2 onClick={function() { console.log("jee")}}>Create new event here</h2>'
        } else {
            var time = Parser.getValue(event, 'timestamp');
            var streetAddress = Parser.getValue(event, 'streetAddress');
            var attendances = Parser.getValue(event, 'attendances');
            markerContent = '<h3>' + event.name + '</h3>'
                            + '<p>' + time + '</p>'
                            + '<p>' + streetAddress + '</p>'
                            + '<p>Attendances: ' + attendances + '</p>';
        }

   // this.transitionTo('eventPage', {id: eventId});

/*
        var contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
              '<div id="bodyContent">'+
              '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
              'sandstone rock formation in the southern part of the '+
              'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
              'south west of the nearest large town, Alice Springs; 450&#160;km '+
              '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
              'features of the Uluru - Kata Tjuta National Park. Uluru is '+
              'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
              'Aboriginal people of the area. It has many springs, waterholes, '+
              'rock caves and ancient paintings. Uluru is listed as a World '+
              'Heritage Site.</p>'+
              '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
              'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
              '(last visited June 22, 2009).</p>'+
              '</div>'+
        '</div>';
        */

        var infowindow = new google.maps.InfoWindow({
            content: markerContent
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
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