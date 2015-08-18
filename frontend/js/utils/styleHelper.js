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
			var eventListHeight = window.innerHeight;
			eventListHeight -= window.CONFIGS.navbarHeight;
			eventListHeight -= window.CONFIGS.eventsListTopicHeight;
			return eventListHeight;
		}
	}
}