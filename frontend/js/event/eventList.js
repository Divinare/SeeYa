var React = require('react');
var Router = require('react-router');

var $ = require('jquery');

var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var tableWidth = window.innerWidth*0.9;
var tableHeight = 300; //(window.innerHeight-350)-120*0.8;

var tableHeaders = ['name', 'address', 'timestamp', 'description'];

/*
function renderRow(rows, rowIndex) {
	console.log(rows[rowIndex]);
	rows[rowIndex].map(function(cell, index) {
		cellRenderer('a', index)
	})
}

function cellRenderer(content, index) {
	console.log("c " + content + " index " + index);
  return (
  	'a'
    //<div styles={{height: '100%'}} onRowClick={handleDoubleClick.bind(null, index)}>{content}</div>
  );
}

function handleDoubleClick(index, event) {
  // handle dbl click
}
*/


var EventList = React.createClass({
	mixins: [ Router.Navigation ],

	getInitialState: function() {

		var colWidths = {
		  name: tableWidth*0.25,
		  address: tableWidth*0.25,
		  time: tableWidth*0.25,
		  description: tableWidth*0.25,
		};

		return {
			isColumnResizing: false,
			columnWidths: colWidths
		};

	},

    rowGetter: function(rowIndex) {
		console.log("row getter");
		var eventList = this.props.eventList;
		if($.isEmptyObject(eventList)) {
			return null
		}
	  return  eventList[rowIndex] //<a href={"events/" + 1}>{"event nimi"}</a>; //rows[rowIndex];
	},

	componentWillMount: function() {

	},

	componentDidMount: function() {
	
	},

	createEventList: function(events) {
		var eventList = [];
		events.map(function(event) {
			eventList.push(event);
		});
		console.log("CREATED EVENT");
		console.log(eventList);

		return eventList;
	},

	handleCellClick: function(headerName, eventId) {
		var that = this;
		console.log("event clicked");
		console.log(headerName);
		console.log("EVENT ID " + eventId);
		this.transitionTo('eventPage', {id: eventId});
	//	if(headerName == 'name') {
		//this.transitionTo('eventPage', {id: 1});
			//this.transitionTo('home');

			//this.transitionTo('eventPage', {id: 1});
		//	this.transition('eventPage', {id: 1});

			//this.transition.redirect('eventPage', {id: 1});
			//transition.redirect('events', {id: 1});
//		}

		//href={"events/" + eventId}
	},
	cellRenderer: function(e, col, e3, row, e5, e6) {
		var eventList = this.props.eventList;

		var headerName = tableHeaders[col];

		var eventId = eventList[row]["id"];
		var content = "";



		return <div styles={{height: '100%'}} onClick={this.handleCellClick.bind(null, headerName, eventId)}>{eventList[row][headerName]}</div>
	},


	onColumnResizeEndCallback: function(newColumnWidth, dataKey) {
	  //  columnWidths[dataKey] = newColumnWidth;
	  //  console.log("col width change: " + newColumnWidth);
	 //   console.log("col width change: " + columnWidths[dataKey]);
	    var colWidths = this.state.columnWidths;
	    colWidths[dataKey] = newColumnWidth;
	    //isColumnResizing = false;
	    this.setState({
	    	isColumnResizing: false,
	    	columnWidths: colWidths
	    });
	    
	 },

	 onContentHeightChange: function(contentHeight) {
	    this.props.onContentDimensionsChange &&
	      this.props.onContentDimensionsChange(
	        contentHeight,
	        Math.max(600, this.props.tableWidth)
	      );
	  },

	render: function(){


	var eventList = this.createEventList(this.props.eventList);
	console.log("EVENT LIST::::::::");
	console.log(eventList);

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
				    rowsCount={eventList.length}
				    width={tableWidth}
				    height={tableHeight}
				    onContentHeightChange={this.onContentHeightChange}
			        isColumnResizing={this.state.isColumnResizing}
			        onColumnResizeEndCallback={this.onColumnResizeEndCallback}>


				    <Column
				      label='Name'
				      width={this.state.columnWidths['name']}
				      dataKey={0}
				      cellRenderer={this.cellRenderer}
				      isResizable={true}
				    />
				    <Column
				      label='Address'
				      width={this.state.columnWidths['address']}
				      dataKey={1}
				      cellRenderer={this.cellRenderer}
				      isResizable={true}
				    />
				    <Column
				      label='Time'
				      width={this.state.columnWidths['time']}
				      dataKey={2}
				      cellRenderer={this.cellRenderer}
				      isResizable={true}
				    />
				    <Column
				      label='Description'
				      width={this.state.columnWidths['description']}
				      dataKey={3}
				      cellRenderer={this.cellRenderer}
				      isResizable={true}
				    />
				</Table>

			</div>
			)


	}

		
	}

});

module.exports = EventList;