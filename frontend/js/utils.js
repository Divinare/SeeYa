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

	urlTokens: function(){
		var http = "http://"			//the base url starts with this, we want to extract the rest of the base url
		var url = window.location.href;
		var baseWithoutHttp = URL.base.slice(http.length)
		var startIndexOfBase = url.indexOf(baseWithoutHttp)

		if(startIndexOfBase != -1){
			var urlWithoutBase = url.substring(startIndexOfBase + baseWithoutHttp.length)
			if(urlWithoutBase.indexOf('/') === 0){ //starts with /
				urlWithoutBase = urlWithoutBase.slice(1); //strip first / away
			}
			return urlWithoutBase.split("/")
		} 
		return new Array();
	},

	isMobile: function(){
		return window.innerWidth < mediumScreenMinWidth
	}

};