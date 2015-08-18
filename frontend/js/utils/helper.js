var URL = require('./url.js');

//bootstrap break points
var extraSmallScreenMaxWidth = 768;  
var smallScreenMinWidth = 768;
var mediumScreenMinWidth = 992;
var largeScreenMinWidth = 1170;

var mapDefaultSize = 0.8; //how much of the height the map takes when we are not on mobile

module.exports = {
	'mapDefaultSize': mapDefaultSize,

	formatDate: function(dateStr){
		var dateObj = new Date(dateStr)
		var formatted = dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear();
		return formatted;
	},

	getUrlTokens: function(){
		// The base url starts with this, we want to extract the rest of the base url
		var http = "http://"
		var url = window.location.href;
		var baseWithoutHttp = URL.base.slice(http.length)
		var startIndexOfBase = url.indexOf(baseWithoutHttp)

		if(startIndexOfBase != -1){
			var urlWithoutBase = url.substring(startIndexOfBase + baseWithoutHttp.length)
			//starts with /
			if(urlWithoutBase.indexOf('/') === 0) {
				//strip first / away
				urlWithoutBase = urlWithoutBase.slice(1);
			}
			return urlWithoutBase.split("/")
		} 
		return new Array();
	},

	isMobile: function(){
		return window.innerWidth < window.CONFIGS.mediumScreenMinWidth
	},

	getMapSizeOnDesktop: function(){
		return window.innerHeight - window.CONFIGS.navbarHeight - window.CONFIGS.mapBottomMargin
	},
	/* Returns lat and lon as array from marker */
	getLatLon: function(marker) {
		if(typeof marker == 'undefined') {
			console.log("getLatLon - marker was undefined");
			return null;
		} else {
			console.log(marker.position);
			var array = [];
			array.push(marker.position.G);
			array.push(marker.position.K);
			return array;
		}
	}

};