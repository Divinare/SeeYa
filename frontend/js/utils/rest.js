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

var addEntry = function(name, data, onSuccess, onError) {
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

var getFilteredEntries = function(name, categoryFilters, fromTimestamp, toTimestamp, onSuccess, onError) {
    var url = URL.getFilteredEntries[name];
    var filters = [];
    for(var filterName in categoryFilters) {
        if(categoryFilters[filterName] == true) {
            filters.push(filterName);      
        }
    }
    if(filters.length > 0) {
        url += filters.join() + '/';
    }
    url += fromTimestamp + '/' + toTimestamp + '/';

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

var authorization = function(action, onSuccess, onError) {
    var url = URL.authorization[action];
    $.ajax({ 
        type: 'GET', 
        url: url,
        dataType: 'json',
        success: onSuccess,
        error: onError  
    });
}


var verifyEmail = function(action, data, onSuccess, onError) {
    var url = URL.verifyEmail[action];
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: onSuccess,
        error: onError
    });
}

module.exports = {

    getEntry: getEntry,
    getAllEntries: getAllEntries,
    addEntry: addEntry,
    removeEntry: removeEntry,
    editEntry: editEntry,
    getFilteredEntries: getFilteredEntries,
    getUsersAttendingEvent: getUsersAttendingEvent,
    authorization: authorization,
    verifyEmail: verifyEmail


}