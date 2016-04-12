var commonUtils = require("../../../common/utils.js");

function showMessageComponent(message, displayTime, type) {


	var msgComponent = $("#messageComponent");
	var width;

	msgComponent.text(message);

	if(type == "success") {
    	msgComponent.css("background-color", "rgba(4,125,4,0.55)");
	} else if(type == "error") {
    	msgComponent.css("background-color", "rgba(150,0,0,0.55)");
	} else {
    	msgComponent.css("background-color", "rgba(0,0,0,0.55)");
	}

	if(UTILS.styleHelper.isTablet()) {
		width = window.innerWidth - 65;
	} else {
		var rightContainerMargin = 10;
		var messageComponentMargin = 66;
		width = window.innerWidth - window.CONFIGS.rightContainerWidthDesktop
		width -= rightContainerMargin;
		width -= messageComponentMargin;
	}
	msgComponent.css("width", width);
	adjustMessageComponentHeight();

	msgComponent.show(800);

	hideComponent(msgComponent, displayTime);
}

function adjustMessageComponentHeight() {
	// TODO:
	// http://stackoverflow.com/questions/5703552/css-center-text-horizontal-and-vertical-inside-a-div-block



}

function hideComponent(msgComponent, displayTime) {
	if(commonUtils.isEmpty(displayTime)) {
		displayTime = 3000;
	}
	if(displayTime == -1) {
		// Displaying untill the user hides it 
		return;
	}
	setTimeout(function(){ msgComponent.hide(500); }, displayTime);
}


module.exports = {
	showMessageComponent: showMessageComponent
}

