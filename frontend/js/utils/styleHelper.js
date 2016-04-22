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

	getRightContainerHeight: function() {
		var screenType = this.getScreenType();
		if(screenType == 'desktop') {	
			var eventListHeight = window.innerHeight;
			eventListHeight -= window.CONFIGS.navbarHeight;
			return eventListHeight-20;
		} else if( screenType == 'tablet') {
			var eventListHeight = (window.innerHeight-141);
			return eventListHeight;
		}
	},

	getRightContainerWidth: function() {
		var screenType = this.getScreenType();

		if(screenType == 'desktop') {
			return window.CONFIGS.rightContainerWidthDesktop;
		} else if(screenType == 'tablet') {
			var eventListWidth = window.innerWidth;
			//eventListWidth -= (marginWidth*2);
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

    // Shows or hides the right-container, depending on the boolean param "show"
    // false = hides right-container, true = shows right-container
	showOrHideRightContainer: function(show) {
        var toggleHeightMobile = window.innerHeight - 188;
        var className = $('.right-container').attr('class');
        var animationGoing = (className.indexOf("toDesktop") != -1 || className.indexOf("toMobile") != -1 ) ? true : false;
        if(animationGoing) {
            return;
        }
        // SHOW
        if(className.indexOf("showing") == -1 && show) {
            $("#rightContainerContent").css("visibility", "visible");
            $("#rightContainerToolbar").css("visibility", "visible");

            if(this.isDesktop()) {
                $(".right-container").animate({'right':'+=350px'},350);
                $(".right-container").addClass("showing");
            } else {
                $(".right-container").animate({'top':'-=' + toggleHeightMobile + 'px'},350);
                $(".right-container").addClass("showing");
            }
        // HIDE
        } else if(className.indexOf("showing") != -1 && !show) {

            $("#rightContainerContent").css("visibility", "hidden");
            $("#rightContainerToolbar").css("visibility", "hidden");
            if(this.isDesktop()) {
                $(".right-container").animate({'right':'-=350px'},350);
                $(".right-container").removeClass("showing");
            } else {
                $(".right-container").animate({'top':'+=' + toggleHeightMobile + 'px'},350);
                $(".right-container").removeClass("showing");
            }
        }   
    },

    // Hides or shows the right-container. If right-container is hidden, it shows it and vise versa.
    toggleRightContainer: function() {
        var className = $('.right-container').attr('class');
        if(className.indexOf("showing") == -1) {
            this.showRightContainer();
        } else {
            this.hideRightContainer();
        }

    },

    hideRightContainer: function() {
        this.showOrHideRightContainer(false);
    },

    showRightContainer: function() {
        this.showOrHideRightContainer(true);
    },

    resetRightContainer: function() {
        var className = $('.right-container').attr('class');
        $("#rightContainerContent").css("visibility", "visible");
        $("#rightContainerToolbar").css("visibility", "visible");

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
                    $(".right-container").css("right", "0px");
                    $(".right-container").addClass("showing");
                    $(".right-container").removeClass("toMobile");
                 }, 499);
            }
        }
    },

    resizeRightContainerContent: function() {

            var toolbarHeight = $("#rightContainerToolbar")[0].clientHeight;
            var bottomBarHeight = $("#rightContainerBottomBar")[0].clientHeight;
            var rightContainerPadding = 40;
            var newHeight = (this.getRightContainerHeight()-rightContainerPadding-toolbarHeight-bottomBarHeight);
            $("#rightContainerContent").css("height", newHeight+"px");
    },

    resizeEventList: function() {

        if(typeof $("#eventListTopic")[0] !== "undefined") {
            var toolbarHeight = $("#rightContainerToolbar")[0].clientHeight;
            var eventListTopicHeight = $("#eventListTopic")[0].clientHeight;
            var eventListBottomBarHeight = $("#eventListBottomBar")[0].clientHeight;
            var rightContainerPadding = 40;
            var newHeight = (this.getRightContainerHeight()-(rightContainerPadding*2)-eventListTopicHeight-eventListBottomBarHeight-toolbarHeight);
            $("#eventListTableContainer").css("height", newHeight+"px");
        }
    }
}