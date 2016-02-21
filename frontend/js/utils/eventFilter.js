

function filterColumns(eventList, eventListData) {
		var filters = eventListData['filters'];
		var filteredRows = eventList;
		Object.getOwnPropertyNames(filters).forEach(function(val) {
			if(filters[val] != "") {
				console.log(filters[val]);
				filteredRows = filterColumn(filteredRows, eventListData, val, filters[val]);
			}
		});
		return filteredRows;
}

function categoryFilter(event) {
	console.log("at filt " + event);
	console.log(event);
    return event.Category.name == value;
}

function filterColumn(eventList, eventListData, tableHeader, value) {
	console.log("TODO, filter......");
//	console.log("ASFsafsafsaf")
	console.log(eventList);
//	console.log("table hear " + tableHeader);
/*
		$.each(eventListData, function(key, value) {
			console.log("key:");
			console.log(key);
			console.log(value);
		    if(value.Category.name != value) {
		        delete eventListData[key];
		    }
		});
		console.log("EV NOW");
		console.log(eventListData);

*/
//	var rows = eventList.slice();
	//var filteredRows = rows;
	var filteredRows = eventList.filter(categoryFilter(event));
	/*
	console.log(eventList);
	for(var i = 0; i < eventList.length; i++) {
		var event = eventList[i];
		filteredRows = eventList.filter(categoryFilter(event, value));
	}
	*/
	console.log(filteredRows);

	//var filteredRows = eventList.filter(categoryFilter(category, value));
/*

		var filters = eventListData['filters'];
		console.log(filters);
		filters[tableHeader] = value;

	    var rows = eventList.slice();
	    var filteredRows = rows;
	    for(var filter in filters) {
		    var filterBy = filters[filter];
		    var tableHeader = filter
		    console.log(filter);
		    filteredRows = filterBy ? filteredRows.filter(function(row){   
		      return UTILS.eventParser.getValue(row, tableHeader).toLowerCase().indexOf(filterBy.toLowerCase()) >= 0
		    }) : filteredRows;
		};
		return filteredRows;
*/


	/*
		var filters = eventListData['filters'];

		filters[tableHeader] = value;

	    var rows = eventList.slice();
	    var filteredRows = rows;
	    for(var filter in filters) {
		    var filterBy = filters[filter];
		    var tableHeader = filter
		    filteredRows = filterBy ? filteredRows.filter(function(row){   
		      return UTILS.eventParser.getValue(row, tableHeader).toLowerCase().indexOf(filterBy.toLowerCase()) >= 0
		    }) : filteredRows;
		};
		return filteredRows;
		*/
}

module.exports = {
	filterColumns: filterColumns,
	filterColumn: filterColumn
}