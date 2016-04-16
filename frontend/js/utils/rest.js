
var getAllEntries = function(name, onSuccess, onError) {
    var url = URL.allEntries[name];
    $.ajax({ 
        type: 'GET', 
        url: url,
        dataType: 'json',
        success: onSuccess,
        error: onError
    });
}

var getFilteredEntries = function(name, categoryFilters, fromTimestamp, toTimestamp, onSuccess, onError) {
    console.log("at getFilteredEntries");
    var url = URL.getFilteredEntries[name];
    console.log(categoryFilters.length);
    var filters = [];
    for(var filterName in categoryFilters) {
        if(categoryFilters[filterName] == true) {
            filters.push(filterName);      
        }
    }
    if(filters.length > 0) {
        url += filters.join() + '/';
    } else {
        url += "all/";
    }
    url += fromTimestamp + '/' + toTimestamp + '/';

    console.log("getting filtered entries from: " + url);
    $.ajax({ 
        type: 'GET', 
        url: url,
        dataType: 'json',
        success: onSuccess,
        error: onError
    });
}

var getUsersAttendingEvent = function(eventId, onSuccess, onError){
    var url = URL.getFilteredEntries['usersAttendingEvent'];
    $.ajax({ 
        type: 'GET', 
        url: url+eventId,
        dataType: 'json',
        success: onSuccess,
        error: onError
    });
}


var getEntry = function(name, id, onSuccess, onError) {
    var url = URL.getEntry[name];
	$.ajax({ 
		type: 'GET', 
		url: url+id,
		dataType: 'json',
		success: onSuccess,
        error: onError
	});
}

var isLoggedIn = function(onSuccess, onError) {
    var url = URL.authorization['loggedInStatus'];
    $.ajax({ 
        type: 'GET', 
        url: url,
        dataType: 'json',
        success: onSuccess,
        error: onError  
    });
}

var logout = function(onSuccess, onError) {
    var url = URL.authorization['logout'];
    $.ajax({ 
        type: 'GET', 
        url: url,
        dataType: 'json',
        success: onSuccess,
        error: onError  
    });
}

var addEntry = function(name, data, onSuccess, onError) {
    console.log("AT ADD ENTRY")
    console.log(onSuccess)
    var url = URL.addEntry[name];
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: onSuccess,
        error: onError
    })
}

var removeEntry = function(name, id, onSuccess, onError) {
    var url = URL.removeEntry[name];

    $.ajax({
        type: 'DELETE',
        url: url+id,
        contentType: "application/json; charset=utf-8",
        success: onSuccess,
        error: onError
    });
}

var editEntry = function(name, id, data, onSuccess, onError){
    var url = URL.editEntry[name];
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url + id,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: onSuccess,
        error: onError
    });
}

module.exports = {

    getAllEntries: getAllEntries,
    getFilteredEntries: getFilteredEntries,
    getUsersAttendingEvent: getUsersAttendingEvent,
    getEntry: getEntry,
    addEntry: addEntry,
    removeEntry: removeEntry,
    editEntry: editEntry,
    isLoggedIn: isLoggedIn,
    logout: logout


}