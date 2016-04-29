var URL = require('./url.js');
var messageComponent = require('./messageComponent.js');

//bootstrap break points
var extraSmallScreenMaxWidth = 768;  
var smallScreenMinWidth = 768;
var mediumScreenMinWidth = 992;
var largeScreenMinWidth = 1170;

var mapDefaultSize = 0.8; //how much of the height the map takes when we are not on mobile

module.exports = {
	'mapDefaultSize': mapDefaultSize,

	formatDate: function(dateStr){
		var dateObj = new Date(dateStr)
		var formatted = dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear();
		return formatted;
	},

	getUrlTokens: function(){
		// The base url starts with this, we want to extract the rest of the base url
		var http = "http://"
		var url = window.location.href;

		var baseWithoutHttp = URL.REST.slice(http.length)
		var startIndexOfBase = url.indexOf(baseWithoutHttp)

		if(startIndexOfBase != -1){
			var urlWithoutBase = url.substring(startIndexOfBase + baseWithoutHttp.length)
			//starts with /
			if(urlWithoutBase.indexOf('/') === 0) {
				//strip first / away
				urlWithoutBase = urlWithoutBase.slice(1);
			}
			return urlWithoutBase.split("/")
		} 
		return new Array();
	},

    urlTokenExistsInUrl: function(token) {
        var tokens = this.getUrlTokens();
        for(var i = 0; i < tokens.length; i++) {
            if(tokens[i] == token) {
                return true;
            }
        }
        return false;
    },

	locationMatches: function(str){
		var regex = new RegExp("^.*" + str)
		var url = window.location.href
		return regex.test(window.location)
	},

	getLocation: function(){
		if(module.exports.isAtLocation('eventForm')){
			return 'eventForm'
		}else if(module.exports.locationMatches('events\\/\\d+\\/edit$')){
			return 'editForm'
		}
		return ''
	},

	isAtLocation: function(routeName) {
		var urlTokens = this.getUrlTokens();
		return urlTokens.indexOf(routeName) > 0;
	},

    // Cuts strings into parts seperated by space (" ")
    // For example, name "aaaaaaaaaaaaaaaaaaaa" is reformatted into "aaaaaaaaaaaaa aaaaaaa" so that it goes to 2 rows in the UI.
    // itemName = string to be formatted, partLength = how long each part is
    formatStringIntoPartsSeperatedBySpace: function(itemName, partLength) {
        console.log("original itemName: " + itemName);
        var itemParts = itemName.split(" ");
        var formattedName = "";
        var newItemParts = [];
        itemParts.map(function(itemPart) {
            if(itemPart.length > partLength) {
                itemPart = _splitName(itemPart, partLength);
            }
            console.log("ITEM PART: " + itemPart);
            newItemParts.push(itemPart);
        })
        console.log("RET: " + newItemParts.join(" "));
        return newItemParts.join(" ");
    },

	/* Returns lat and lon as array from marker */
	getLatLon: function(marker) {
		if(typeof marker == 'undefined') {
			return null;
		} else {
			var array = [];
			for (var prop in marker.position) {
				console.log(marker.position[prop])
				array.push(marker.position[prop])
			}
			return array;
		}
	},

	isUsingMobile: function() {
        var isMobile = false;
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
            isMobile = true;
        }
        return isMobile;
    },

    showMessageComponent: function(message, displayTime, type) {
    	messageComponent.showMessageComponent(message, displayTime, type);
    },

    hideSingeSelectDropdown: function(event) {
	    var eventTarget = $(event.target)[0];
	    var shouldHideEventForm = true;
	    if(typeof eventTarget != 'undefined' && eventTarget != null) {
	        if(eventTarget.className == "eventFormListRow") {
	            shouldHideEventForm = false;
	        }
	    }
	    if(shouldHideEventForm) {
	        $("#singleSelectContent").slideUp(150, function(){ });
	    }
    },

    hideCategoryDropdownEventlist: function(event) {
    	var classesThatShouldPreventHiding = [
    		"eventListDropdownSelectAllTextField",
    		"eventListDropdownSelectAllContainer",
    		"eventListDropdownSelectAllCheckbox",
    		"eventListDropdownRow",
    		"dropdownBtnEventList",
    		"eventListItemCategoryName",
    		"itemDropdownEventList",
    		"eventListDropdownCheckbox"
    	];
	    var eventTarget = $(event.target)[0];
	    var shouldHideCategories = true;
	    if(typeof eventTarget != 'undefined' && eventTarget != null) {
	    	for(var i = 0; i < classesThatShouldPreventHiding.length; i++) {
	    		if(eventTarget.className == classesThatShouldPreventHiding[i]) {
	    			shouldHideCategories = false;
	    		}
	    	}
	    }
	    if(shouldHideCategories) {
	        $("#categoriesContentEventList").slideUp(150, function(){ });
	    }
    }
};


function _splitName(itemPart, partLength) {
    var nameSplitCorrectly = false;
    var newItemParts = [];
    while(!nameSplitCorrectly) {
        if(itemPart.length > partLength) {
            newItemParts.push(itemPart.substring(0,partLength));
            var endOfItem = itemPart.substring(partLength, itemPart.length);
            itemPart = endOfItem;
        } else {
            newItemParts.push(itemPart); // push the last part also to newItemParts, important!
            nameSplitCorrectly = true;
        }
    }
    return newItemParts.join(" ");
}