//getMapSizeOnDesktop

module.exports = {

	isMobile: function(){
		return window.innerWidth < window.CONFIGS.mediumScreenMinWidth;
	},

	getMapHeight: function(screenType){
		if(screenType == 'desktop') {
			return window.innerHeight - window.CONFIGS.navbarHeight - window.CONFIGS.mapBottomMargin;
		}
	},

	getEventListHeight: function(screenType) {
		if(screenType == 'desktop') {	
			console.log("HEIGH?????????????");
			var eventListHeight = window.innerHeight;
			console.log(eventListHeight);
			
			eventListHeight -= window.CONFIGS.navbarHeight;
			console.log(eventListHeight);
			
			eventListHeight -= window.CONFIGS.eventsListTopicHeight;
			console.log(eventListHeight);

			eventListHeight -= window.CONFIGS.mapBottomMargin;
			console.log(eventListHeight);
			return eventListHeight;
		}
	}


}