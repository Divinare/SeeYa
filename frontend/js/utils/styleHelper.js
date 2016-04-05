var marginWidth = 10;

module.exports = {

	isTablet: function() {
		return window.innerWidth < window.CONFIGS.mediumScreenMinWidth;
	},

	getMapHeight: function() {
		var mapHeight = window.innerHeight;

		//if(mapHeight < 600) {
		//	mapHeight = 600; // minHeight;
		//}
		return mapHeight;

	},

	getMapWidth: function() {
		return window.innerWidth;
	},

	getEventListHeight: function() {
		var screenType = this.getScreenType();
		if(screenType == 'desktop') {	
			var eventListHeight = window.innerHeight;
			eventListHeight -= window.CONFIGS.navbarHeight;
			return eventListHeight-20;
		} else if( screenType == 'tablet') {
			var eventListHeight = (window.innerHeight-141);
			console.log("RET EVNETLIST HEIGHT: " + eventListHeight);
			return eventListHeight;
		}
	},

	getEventListWidth: function() {
		var screenType = this.getScreenType();

		if(screenType == 'desktop') {
			return window.CONFIGS.rightContainerWidthDesktop;
		} else if(screenType == 'tablet') {
			var eventListWidth = window.innerWidth;
			eventListWidth -= (marginWidth*2);
			return eventListWidth;
		}
	},

	getScreenType: function() {
		if(this.isTablet()) {
			return 'tablet';
		}
		else {
			return 'desktop';
		}
	},

	toggleRightContainer: function() {

    },

    hideRightContainer: function() {

        var className = $('.right-container').attr('class');
        if(className.indexOf("showing") != -1) {
            $(".right-container").animate({'top':'+=500px'},350);
            $(".right-container").toggleClass("showing");
        } else {
        	
        }
    },

    showRightContainer: function() {
        var className = $('.right-container').attr('class');
        if(className.indexOf("showing") != -1) {
        
        } else {
            $(".right-container").animate({'top':'-=500px'},350);
            $(".right-container").toggleClass("showing");
        }

    }
}