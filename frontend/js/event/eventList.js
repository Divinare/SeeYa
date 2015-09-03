var React = require('react');
var Router = require('react-router');
var Moment = require('moment');

var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

/* NOTE:
	If function name starts with _ that means it is related to 
	fixed-data-table API
*/

var EventList = React.createClass({
	mixins: [ Router.Navigation ],

	getInitialState: function() {
		return {}
	},

	componentDidMount: function() {
		var that = this;
		console.log("mounteDDDDDDDDDDDDDD");
		//	filterRows: function(tableHeader, value) {

		var filters = this.props.eventListData['filters'];
		/*
		for(var index in filters) {
			if(filters.hasOwnProperty(index) && filters[index] != "") {
				console.log(filters[index]);
				console.log("jeejee")
			}
		}
		*/


		Object.getOwnPropertyNames(filters).forEach(function(val) {
			if(filters[val] != "") {
				console.log(filters[val]);
				that.filterRows(val, filters[val]);
			}
		});
		this.forceUpdate();

		console.log(this.props.eventListData);
	},

	componentWillReceiveProps: function() {
	},

    rowGetter: function(rowIndex) {
		var eventList = this.props.filteredEventList;
		if($.isEmptyObject(eventList)) {
			return null
		}
	  return  eventList[rowIndex] //<a href={"events/" + 1}>{"event nimi"}</a>; //rows[rowIndex];
	},

	handleCellClick: function(headerName, eventId) {
		var that = this;
		if(headerName == 'name') {
			this.centerMapToMarker(eventId, 12);
			this.transitionTo('eventPage', {id: eventId});
		} else if (headerName == 'address') {
			this.centerMapToMarker(eventId, -1);
		}
	},

	centerMapToMarker: function(eventId, zoomLevel) {
			// Find event by id
			var event = $.grep(this.props.eventList, function(e){ return e.id == eventId; });
			var lat = event[0].lat;
			var lon = event[0].lon;
			var pt = new google.maps.LatLng(lat, lon);
			map.setCenter(pt);
			if(zoomLevel != -1) {
				map.setZoom(zoomLevel);
			}

	},

	cellRenderer: function(e, col, e3, row, e5, e6) {
	//	console.log(e + " " + col + " " + e3 + " " + row + " " + e5 + " " + e6);
		var eventList = this.props.filteredEventList;
		var contentName = col;
		var headerName = UTILS.eventParser.getTableHeader(contentName); //tableHeaders[col];

		var eventId = eventList[row]["id"];
		
		var content = UTILS.eventParser.getValue(eventList[row], contentName);
 		var className = '';
 		if(headerName == 'name' || headerName == 'address') {
 			className = 'link';
 		}
		return <div className={className} styles={{height: '100%'}} onClick={this.handleCellClick.bind(null, headerName, eventId)}>{content}</div>
	},

	_sortRowsBy: function(cellDataKey) {
		var eventListData = this.props.eventListData;
		var rows = this.props.filteredEventList.slice();
	    var sortDir = eventListData.sortDir;
	    var sortBy = cellDataKey;
	    if (sortBy === eventListData.sortBy) {
	        sortDir = sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
	    } else {
	        sortDir = SortTypes.DESC;
	    }
	    rows.sort((eventA, eventB) => {
	      var sortVal = 0;
	      if (UTILS.eventParser.getValue(eventA, sortBy) > UTILS.eventParser.getValue(eventB, sortBy)) {
	        sortVal = 1;
	      }
	      if (UTILS.eventParser.getValue(eventA, sortBy) < UTILS.eventParser.getValue(eventB, sortBy)) {
	        sortVal = -1;
	      }
	      
	      if (sortDir === SortTypes.DESC) {
	        sortVal = sortVal * -1;
	      }
	      
	      return sortVal;
	    });

		this.props.updateAppStatus('filteredEventList', rows);
	    this.props.updateEventListData('sortBy', sortBy);
	    this.props.updateEventListData('sortDir', sortDir);
	    
	  },

	 _renderHeader: function(label, cellDataKey) {
		return (
			<div className='link' onClick={this._sortRowsBy.bind(null, cellDataKey)}>{label}</div>
		);
	 },

	filterRows: function(tableHeader, value) {
		console.log("filtering rows! " + tableHeader + " " + value);
		var eventListData = this.props.eventListData;
		var filters = eventListData['filters'];

		filters[tableHeader] = value;

	    var rows = this.props.eventList.slice();
	    var filteredRows = rows;
	    for(var filter in filters) {
		    var filterBy = filters[filter];
		    var tableHeader = filter
		    filteredRows = filterBy ? filteredRows.filter(function(row){
		      return UTILS.eventParser.getValue(row, tableHeader).toLowerCase().indexOf(filterBy.toLowerCase()) >= 0
		    }) : filteredRows;
		};

		this.props.updateAppStatus('filteredEventList', filteredRows);
	},

	filterChange: function(tableHeader) {
		
		return function (e) {
	       var value = e.target.value;
		   this.filterRows(tableHeader, value);
	       this.props.updateEventListData(tableHeader, value, 'filters');
        }.bind(this);


	},

	renderFilterFields: function() {
	 	var that = this;
	 	var eventListData = this.props.eventListData;


	 	return (eventListData.tableContentNames.map(function(contentName) {
	 			var tableHeader = UTILS.eventParser.getTableHeader(contentName);
	 			var columnWidth = that.getTableSizes().columnWidths[tableHeader];
	 			var styles={
	 				width: columnWidth + 'px'
	 			};
	 			// TODO: causes warning:
				return (
					<input type='text' style={styles} value={eventListData['filters'][contentName]} onChange={that.filterChange(contentName)} placeholder='Filter...' />
				);
			})
		
		);
		
	},

	getTableSizes: function() {
		var tableWidth =  this.props.eventListData.tableWidth;
		var tableHeight = this.props.eventListData.tableHeight;

		var timeHeaderWidth = 150;	
		var attendancesWidth = 50;
		var tableScaleWidth = tableWidth - timeHeaderWidth - attendancesWidth;

		var tableSizes = {};

		tableSizes.columnWidths = {
		  name: tableScaleWidth*0.4,
		  address: tableScaleWidth*0.6,
		  time: timeHeaderWidth,
		  attendances: attendancesWidth
		};
		tableSizes.tableWidth = tableWidth;
		tableSizes.tableHeight = tableHeight;

		return tableSizes;
	},

	render: function() {
		var that = this;

		// Use eventList if filteredEventList is empty
		var eventList = this.props.filteredEventList;
		console.log(eventList);
		var eventListData = this.props.eventListData;

	    var sortDirArrow = '';
	    var sortBy = eventListData.sortBy;
	    var sortDir = eventListData.sortDir;

	    if (sortDir !== null){
	      sortDirArrow = sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
	    }

		// Display loading text while loading eventList
		//if($.isEmptyObject(eventList)) {
		//	return (
		//		<div>"Loading..."</div>
	//			)
		// Return event table with real data
		//} else {
			return (
				<div className="right-container">
					<h1>Events</h1>
					{this.renderFilterFields()}
					<Table
						headerHeight={50}
					    rowHeight={30}
					    rowGetter={this.rowGetter}
					    rowsCount={eventList.length}
					    width={this.props.eventListData.tableWidth}
					    height={this.props.eventListData.tableHeight}>

					    <Column
						    headerRenderer={this._renderHeader}
						    label={'Name' + (sortBy === 'name' ? sortDirArrow : '')}
						    width={this.getTableSizes().columnWidths['name']}
						    dataKey={'name'}
						    cellRenderer={this.cellRenderer} />
					    <Column
						    headerRenderer={this._renderHeader}
						    label={'o/' + (sortBy === 'Attendances' ? sortDirArrow : '')}
						    width={this.getTableSizes().columnWidths['attendances']}
						    dataKey={'attendances'}
						    cellRenderer={this.cellRenderer} />
					    <Column
						    headerRenderer={this._renderHeader}
						    label={'Address' + (sortBy === 'Address' ? sortDirArrow : '')}
						    width={this.getTableSizes().columnWidths['address']}
						    dataKey={'streetAddress'}
						    cellRenderer={this.cellRenderer} />
					    <Column
						    headerRenderer={this._renderHeader}
						    label={'Time' + (sortBy === 'timestamp' ? sortDirArrow : '')}
						    width={this.getTableSizes().columnWidths['time']}
						    dataKey={'timestamp'}
						    cellRenderer={this.cellRenderer} />
					</Table>
				</div>
				)
	//		}		
		}
});

module.exports = EventList;