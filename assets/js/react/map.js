var React = require('react');
var L = require('leaflet');
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

var Map = React.createClass({

    getInitialState: function() {

      return {

      };

    },
    componentWillMount: function() {

    },

    componentDidMount: function() {
        this.initMap();
        console.log("JEEEEEEEEEEE");
    },

    initMap: function() {
  //  	var map = L.map('map');
	//	map.setView([47.63, -122.32], 11);
/*
		var map = new L.Map('map', {center: new L.LatLng(51.51, -0.11), zoom: 9});
	    var googleLayer = new L.Google('ROADMAP');
        map.addLayer(googleLayer);
*/
/*
		var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>';
		 

		var tiles = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png';
		 
		L.tileLayer(tiles, {
		  maxZoom: 18,
		  attribution: attribution
		}).addTo(map);
*/

    },

  render: function(){
    return (
      <div id="map"></div>
    )
  }

});

module.exports = Map;