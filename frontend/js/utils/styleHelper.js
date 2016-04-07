var marginWidth = 10;

module.exports = {

	isTablet: function() {
		return window.innerWidth < window.CONFIGS.mediumScreenMinWidth;
	},

    isDesktop: function() {
        return window.innerWidth >= window.CONFIGS.mediumScreenMinWidth;
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

	toggleRightContainer: function(show) {
        console.log("AT TOGGLE RIGHT CONTAINER");
        var toggleHeightMobile = window.innerHeight - 188;
        var className = $('.right-container').attr('class');
        // SHOW
        if(className.indexOf("showing") == -1 && show) {
            if(this.isDesktop()) {
                console.log("SHOW DESKTOP");
                $(".right-container").animate({'right':'+=350px'},350);
                $(".right-container").addClass("showing");
            } else {
                $(".right-container").animate({'top':'-=' + toggleHeightMobile + 'px'},350);
                $(".right-container").addClass("showing");
            }
        // HIDE
        } else if(className.indexOf("showing") != -1 && !show) {
            if(this.isDesktop()) {
                console.log("HIDE DESKTOP");
                $(".right-container").animate({'right':'-=350px'},350);
                $(".right-container").removeClass("showing");
            } else {
                $(".right-container").animate({'top':'+=' + toggleHeightMobile + 'px'},350);
                $(".right-container").removeClass("showing");
            }
        }   
    },

    hideRightContainer: function() {
        this.toggleRightContainer(false);
    },

    showRightContainer: function() {
        this.toggleRightContainer(true);
    },

    resetRightContainer: function() {
        var className = $('.right-container').attr('class');

        if(this.isDesktop()) {
            if(className.indexOf("toDesktop") == -1) {
                $(".right-container").addClass("toDesktop");
                setTimeout(function(){ 
                    $(".right-container").css("top", "60px");
                    $(".right-container").css("right", "10px");
                    $(".right-container").addClass("showing");
                    $(".right-container").removeClass("toDesktop");
                 }, 499);
            }
        } else {

            if(className.indexOf("toMobile") == -1) {
                $(".right-container").addClass("toMobile");
                setTimeout(function(){ 
                    $(".right-container").css("top", "131px");
                    $(".right-container").css("right", "10px");
                    $(".right-container").addClass("showing");
                    $(".right-container").removeClass("toMobile");
                 }, 499);
            }
        }
    }
}