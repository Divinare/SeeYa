
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

var getFilteredEntries = function(name, category, fromTimestamp, toTimestamp, onSuccess, onError) {
    console.log("at getFilteredEntries");
    var url = URL.getFilteredEntries[name];
    url += category + '/' + fromTimestamp + '/' + toTimestamp + '/';
    /*
    var urlFilters = [];

    var filterMappings = [];
    filterMappings["category"] = 0;

    for(var i = 0; i < filters.length; i++) {
        var filter = filters[i];
        console.log(filter.name);
        console.log(filterMappings[filter.name]);
        urlFilters[filterMappings[filter.name]] = filter.value;
    }
    console.log(urlFilters);
    for(var i = 0; i < urlFilters.length; i++) {
        url +=  urlFilters[i] + '/';
    }
    console.log(url);
    */
    console.log("getting filtered entries from: " + url);
    $.ajax({ 
        type: 'GET', 
        url: url,
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

module.exports = {

    getAllEntries: getAllEntries,
    getFilteredEntries: getFilteredEntries,
    getEntry: getEntry,
    addEntry: addEntry,
    removeEntry: removeEntry,
    editEntry: editEntry,
    isLoggedIn: isLoggedIn


}