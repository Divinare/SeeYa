var React = require('react');
var Router = require('react-router');
var Moment = require('moment')

var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};
// must be in the same order as in the database columns
var tableHeaders = ['name', 'Attendances', 'Address', 'timestamp' ];

var EventList = React.createClass({
	mixins: [ Router.Navigation ],

	getInitialState: function() {
		var tableWidth = window.innerWidth*0.5;
		var tableHeight = 300;

		var timeHeaderWidth = 150;
		var attendancesWidth = 50;
		var tableScaleWidth = tableWidth - timeHeaderWidth - attendancesWidth;
		console.log(tableScaleWidth);

		var colWidths = {
		  name: tableScaleWidth*0.4,
		  address: tableScaleWidth*0.6,
		  time: timeHeaderWidth,
		  attendances: attendancesWidth
		};

		return {
			tableWidth: tableWidth,
			tableHeight: tableHeight,
			columnWidths: colWidths
		};

	},

    rowGetter: function(rowIndex) {
		var eventList = this.props.eventList;
		if($.isEmptyObject(eventList)) {
			return null
		}
	  return  eventList[rowIndex] //<a href={"events/" + 1}>{"event nimi"}</a>; //rows[rowIndex];
	},

	componentDidMount: function() {
		console.log("component did mount");
	},

	handleCellClick: function(headerName, eventId) {
		var that = this;
		console.log("event clicked");
		console.log(headerName);
		console.log("EVENT ID " + eventId);


		if(headerName == 'name') {
			this.transitionTo('eventPage', {id: eventId});
		}
	},

	filterChange: function() {
		console.log("filter!");
	},

	cellRenderer: function(e, col, e3, row, e5, e6) {
		if(row == 0) {
	    	return <input type='text' styles={{height: '20px'}} onChange={this.filterChange('address')} id='' placeholder='Filter...'></input>
		}

		//row  = row - 1;
	//	console.log(e + " " + col + " " + e3 + " " + row + " " + e5 + " " + e6);
		var eventList = this.props.eventList;

		var headerName = col; //tableHeaders[col];

		var eventId = eventList[row]["id"];
		var content = eventList[row][headerName];
 		var className = '';
 		if(headerName == 'name') {
 			className = 'eventListNameLink';
 		}
		if(headerName == 'timestamp') {
			var date = Moment.unix(content/1000).format("DD.MM.YYYY");
			var time = Moment.unix(content/1000).format("HH:mm")
			content = time + ' ' + date;
		}
		if (headerName == 'Address') {
			content = eventList[row][headerName].streetAddress
		}
		if(headerName == 'Attendances') {
			console.log("row? " + row + " headerN? " + headerName);
			content = eventList[row][headerName].length;
		}

		return <div className={className} styles={{height: '100%'}} onClick={this.handleCellClick.bind(null, headerName, eventId)}>{content}</div>
	},

	_sortRowsBy: function(cellDataKey) {
		var eventListData = this.props.eventListData;
	    var sortDir = eventListData.sortDir;
	    var sortBy = cellDataKey;
	    if (sortBy === eventListData.sortBy) {
	        sortDir = sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
	    } else {
	        sortDir = SortTypes.DESC;
	    }
	    
	    var rows = this.props.eventList.slice();
	    if(sortBy == 'Address') {
		    rows.sort((a, b) => {
			    var sortVal = 0;
			    if(typeof a[sortBy] != 'undefined') {
		        if (a[sortBy].streetAddress > b[sortBy].streetAddress) {
		            sortVal = 1;
		        }
		        if (a[sortBy].streetAddress < b[sortBy].streetAddress) {
		            sortVal = -1;
		        }
		      
		        if (sortDir === SortTypes.DESC) {
		            sortVal = sortVal * -1;
		        }
		    	}
		      
		        return sortVal;
		    });
		} else {
		    rows.sort((a, b) => {
		      var sortVal = 0;
		      if (a[sortBy] > b[sortBy]) {
		        sortVal = 1;
		      }
		      if (a[sortBy] < b[sortBy]) {
		        sortVal = -1;
		      }
		      
		      if (sortDir === SortTypes.DESC) {
		        sortVal = sortVal * -1;
		      }
		      
		      return sortVal;
		    });
		}
	    this.props.updateEventList(rows);
	    this.props.updateEventListData('sortBy', sortBy);
	    this.props.updateEventListData('sortDir', sortDir);
	    
	  },

	 _renderHeader: function(label, cellDataKey) {
		return (
			<a onClick={this._sortRowsBy.bind(null, cellDataKey)}>{label}</a>
		);
	 },

	render: function() {
		var eventList = this.props.eventList;
		var eventListData = this.props.eventListData;

	    var sortDirArrow = '';
	    var sortBy = eventListData.sortBy;
	    var sortDir = eventListData.sortDir;

	    if (sortDir !== null){
	      sortDirArrow = sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
	    }

		// Display loading text while loading eventList
		if($.isEmptyObject(eventList)) {
			return (
				<div>"Loading..."</div>
				)
		// Return event table with real data
		} else {
			return (
				<div id="eventList">
					<h1>Events</h1>

					<Table
						headerHeight={50}
					    rowHeight={30}
					    rowGetter={this.rowGetter}
					    rowsCount={eventList.length+1}
					    width={this.state.tableWidth}
					    height={this.state.tableHeight}>

					    <Column
					      headerRenderer={this._renderHeader}
					      label={'Name' + (sortBy === 'name' ? sortDirArrow : '')}
					      width={this.state.columnWidths['name']}
					      dataKey={'name'}
					      cellRenderer={this.cellRenderer}
					    />
					    <Column
					      headerRenderer={this._renderHeader}
					      label={'o/' + (sortBy === 'Attendances' ? sortDirArrow : '')}
					      width={this.state.columnWidths['attendances']}
					      dataKey={'Attendances'}
					      cellRenderer={this.cellRenderer}
					    />
					    <Column
					      headerRenderer={this._renderHeader}
					      label={'Address' + (sortBy === 'Address' ? sortDirArrow : '')}
					      width={this.state.columnWidths['address']}
					      dataKey={'Address'}
					      cellRenderer={this.cellRenderer}
					    />
					    <Column
					      headerRenderer={this._renderHeader}
					      label={'Time' + (sortBy === 'timestamp' ? sortDirArrow : '')}
					      width={this.state.columnWidths['time']}
					      dataKey={'timestamp'}
					      cellRenderer={this.cellRenderer}
					    />
					</Table>
				</div>
				)
			}		
		}
});

module.exports = EventList;