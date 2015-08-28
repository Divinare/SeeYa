var marginWidth = 10;

module.exports = {

	isTablet: function() {
		return window.innerWidth < window.CONFIGS.mediumScreenMinWidth;


	},

	getMapHeight: function() {
		var screenType = this.getScreenType();

		if(screenType == 'desktop') {
			var mapHeight = window.innerHeight;
			mapHeight -= window.CONFIGS.navbarHeight;
			mapHeight -= window.CONFIGS.mapBottomMargin;
			return mapHeight;
		} else if (screenType == 'tablet') {
			var mapHeight = window.innerHeight;
			mapHeight -= window.CONFIGS.navbarHeight;
			mapHeight -= window.CONFIGS.eventsListTopicHeight;
			mapHeight = mapHeight/2;
			mapHeight -= 20;
			return mapHeight;
		}
	},

	getMapWidth: function() {
		var screenType = this.getScreenType();

		if(screenType == 'desktop') {
			var mapWidth = window.innerWidth;
			mapWidth = mapWidth/2;
			mapWidth -= (marginWidth*5);
			return mapWidth;
		} else if(screenType == 'tablet') {
			return window.innerWidth;
		}
	},

	getEventListHeight: function() {
		var screenType = this.getScreenType();

		if(screenType == 'desktop') {	
			var eventListHeight = window.innerHeight;
			eventListHeight -= window.CONFIGS.navbarHeight;
			eventListHeight -= window.CONFIGS.eventsListTopicHeight;
			return eventListHeight;
		} else if( screenType == 'tablet') {
			var eventListHeight = window.innerHeight;
			eventListHeight -= window.CONFIGS.navbarHeight;
			eventListHeight -= window.CONFIGS.eventsListTopicHeight;
			eventListHeight = eventListHeight/2;
			//eventListHeight -= (marginWidth*2);
			return eventListHeight;
		}
	},

	getEventListWidth: function() {
		var screenType = this.getScreenType();

		if(screenType == 'desktop') {	
			return window.innerWidth/2;
		} else if(screenType == 'tablet') {
			var eventListWidth = window.innerWidth;
			eventListWidth -= (marginWidth*4);
			return eventListWidth;
		}
	},

	getScreenType: function() {
		if(this.isTablet()) {
			return 'tablet';
		}
		// TODO: also add "isMobile"
		else {
			return 'desktop';
		}
	}
}