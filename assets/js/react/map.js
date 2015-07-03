var React = require('react');

var GoogleMapsLoader = require('google-maps');
var $ = require('jquery');
//var Map = ReactGoogleMaps.Map;
//var Marker = ReactGoogleMaps.Marker;

var Map = React.createClass({

    getDefaultProps: function () {
        return {
            initialZoom: 8,
            mapCenterLat: 60,
            mapCenterLng: 20,
        };
    },
    componentDidMount: function (rootNode) {
        var that = this;
        var mapOptions = {
          center: { lat: 60.205294, lng: 24.936092},
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