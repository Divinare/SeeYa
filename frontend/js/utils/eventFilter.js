

function filterColumns(eventList, eventListData) {
	console.log("at filterColumns");
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

function filterColumn(eventList, eventListData, tableHeader, value) {
		console.log("filtering rows! " + tableHeader + " " + value);
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
}

module.exports = {
	filterColumns: filterColumns,
	filterColumn: filterColumn
}