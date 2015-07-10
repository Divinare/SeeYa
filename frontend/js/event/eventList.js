var React = require('react');

var $ = require('jquery');
var _ = require('lodash');
var DataTable = require('react-data-components').DataTable;

var columns = [
    { title: 'Name', prop: 'name'  },
    { title: 'Date', prop: 'date' },
    { title: 'Participants', prop: 'participants' },
    { title: 'Address', prop: 'address' }

];
 
var data = [
  { name: 'name value', date: 'city value', participants: 'address value', address: 'phone value' },
  { name: 'name value1', date: 'city value', participants: 'address value', address: 'phone value' },
  { name: 'name value2', date: 'city value', participants: 'address value', address: 'phone value' },
  { name: 'name value3', date: 'city value', participants: 'address value', address: 'phone value' },
  { name: 'name value4', date: 'city value', participants: 'address value', address: 'phone value' },
  { name: 'name value5', date: 'city value', participants: 'address value', address: 'phone value' }
  // It also supports arrays 
  // [ 'name value', 'city value', 'address value', 'phone value' ] 
];

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
	console.log("^");
	//var eventList = this.createEventList(events);




		return (
			<div id="eventList">
				<h1 className='bottomListTopic'>Events</h1>

			</div>
			)
	}

});

module.exports = EventList;