

function showMessageComponent(message, displayTime, type) {


	var msgComponent = $("#messageComponent");
	var width;

	msgComponent.text(message);

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
	msgComponent.show(1000);

	hideComponent(msgComponent, displayTime);
}

function hideComponent(msgComponent, displayTime) {
	setTimeout(function(){ msgComponent.hide(500); }, displayTime);
}


module.exports = {
	showMessageComponent: showMessageComponent
}

