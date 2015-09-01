
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

module.exports = {

    getAllEntries: getAllEntries,
    getEntry: getEntry,
    addEntry: addEntry,
    removeEntry: removeEntry

}