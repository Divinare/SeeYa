var URL = require('./url.js');
module.exports = {
	moi: function() {
		console.log("jee");
	},

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
	}

};