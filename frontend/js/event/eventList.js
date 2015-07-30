var React = require('react');

var $ = require('jquery');

var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b3', 'c2'],
  ['a3', 'b3', 'c3'],
];

function rowGetter(rowIndex) {
	console.log("row getter");
  return  <a href={"events/" + 1}>{"event nimi"}</a>; //rows[rowIndex];
}
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


	getInitialState: function() {

		return {

		};

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
		return eventList;
	},

	handleRowClick: function(index) {
		console.log("event clicked");
		console.log(index);
	},
	cellRenderer: function(e, e2, e3, e4, e5, e6) {
		var index = 1;
		console.log("jee:");
		console.log(e);
		console.log(e2);
		console.log(e3);
		console.log("INDEX? " + e4);
		console.log(e5);
		console.log(e6); // onClick={this.handleRowClick.bind(null, e4)}
		return <a styles={{height: '100%'}} href={"events/" + e4}>'event nimi'</a>
	},
/*

			    <DataTable
			      className="container"
			      keys={[ 'name', 'address', 'id' ]}
			      columns={columns}
			      initialData={eventList}
			      initialPageLength={5}
			      initialSortBy={{ prop: 'city', order: 'descending' }}
			      pageLengthOptions={[ 5, 20, 50 ]}
			    />
			    */

	render: function(){


	//var eventList = this.data;
	console.log(this.props.eventList);

	//var eventList = this.createEventList(events);




		return (
			<div id="eventList">
				<h1>Events</h1>

				<Table
				    rowHeight={50}
				    rowGetter={rowGetter}
				    rowsCount={rows.length}
				    width={window.innerWidth*0.6}
				    height={window.innerHeight*0.3}
				    headerHeight={50}>

				    <Column
				      label="Name"
				      width={100}
				      dataKey={0}
				      cellRenderer={this.cellRenderer}
				    />
				    <Column
				      label="Address"
				      width={100}
				      dataKey={1}
				      cellRenderer={this.cellRenderer}
				    />
				    <Column
				      label="Time"
				      width={100}
				      dataKey={2}
				    />
				    <Column
				      label="Description"
				      width={100}
				      dataKey={3}
				    />
				  </Table>

			</div>
			)
	}

});

module.exports = EventList;