var commonUtils = require("../../../common/utils.js");

/* Message: message to display
   displayTime: display time in milliseconds, -1 for displaying until the user closes it
   type = normal / success / error
*/

function showMessageComponent(message, displayTime, type) {


	var msgComponent = $("#messageComponent");

	msgComponent.text(message);

	if(type == "success") {
    	msgComponent.css("background-color", "rgba(4,125,4,0.6)");
	} else if(type == "error") {
    	msgComponent.css("background-color", "rgba(150,0,0,0.6)");
	} else {
    	msgComponent.css("background-color", "rgba(0,0,0,0.6)");
	}

	adjustMessageComponentWidth();

	msgComponent.show(800);

	hideComponent(msgComponent, displayTime);
}

function adjustMessageComponentWidth() {
	var msgComponent = $("#messageComponent");
	var width;

	if(UTILS.styleHelper.isTablet()) {
		width = window.innerWidth - 65;
	} else {
		var rightContainerMargin = 10;
		var messageComponentMargin = 66;
		width = window.innerWidth - window.CONFIGS.rightContainerWidthDesktop;
		width -= rightContainerMargin;
		width -= messageComponentMargin;
	}
	msgComponent.css("width", width);
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
	showMessageComponent: showMessageComponent,
	adjustMessageComponentWidth: adjustMessageComponentWidth
}

