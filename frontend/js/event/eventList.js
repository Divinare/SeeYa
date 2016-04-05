var Router = require('react-router');
var Moment = require('moment');

var Dropdown = require('./eventListDropdown.js');
//var Dateselect = require('../dateselect.js');
//var DatePicker = require('../datepicker.js');
import { browserHistory } from 'react-router'

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

/* NOTE:
    If function name starts with _ that means it is related to 
    fixed-data-table API
*/

const EventList = React.createClass({

    getInitialState: function() {
        var eventListData = this.props.eventListData;
        var selectedCategory = eventListData['filters'].category;
        return {
            categories: [],
            selectedCategory: selectedCategory
        }
    },

    componentDidMount: function() {

        this.props.handleResize();
        var that = this;

        var onSuccess = function (data) {
            var categories = [];
            for(var index in data) {
                categories.push(data[index]);
            }
            that.setState({
                categories: categories
            })
        };
        var onError = function() {
            console.log("Error on fetching event!");
        }
        UTILS.rest.getAllEntries('category', onSuccess, onError);
        $("#homeIcon").css("display", "none");
    },

    componentWillMount :function() {
    },

    componentWillUnmount: function() {
        $("#homeIcon").css("display", "block");
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
            //this.transitionTo('eventPage', {id: eventId});
            console.log("EventId: " + eventId);

            browserHistory.push('events/' + eventId);

            //this.context.router.transitionTo('eventPage', {id: eventId});
        } else if (headerName == 'address') {
            this.centerMapToMarker(eventId, -1);
        }
    },

    centerMapToMarker: function(eventId, zoomLevel) {

        // Find event by id
        var event = $.grep(this.props.filteredEventList, function(e){ return e.id == eventId; });
        var lat = event[0].lat;
        var lon = event[0].lon;
        var pt = new google.maps.LatLng(lat, lon);
        map.setCenter(pt);
        if(zoomLevel != -1) {
            map.setZoom(zoomLevel);
        }
    },

    cellRenderer: function(headerName, content, eventId) {
        var className = '';
        if(headerName == 'name' || headerName == 'map') {
            className = 'link';
        }
        return <div className={className} styles={{height: '100%'}} onClick={this.handleCellClick.bind(null, headerName, eventId)}>{content}</div>
    },

    _sortRowsBy: function(sortBy) {
        sortBy = sortBy.toLowerCase();
        var eventListData = this.props.eventListData;
        var rows = this.props.filteredEventList.slice();
        var sortDir = eventListData.sortDir;
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

        var currentData = this.state.eventListData;
        eventListData['sortBy'] = sortBy;
        eventListData['sortDir'] = sortDir;
        this.props.updateAppStatus('eventListData', eventListData);
      },

     _renderHeader: function(headerName) {
        return (
            <div className='link' onClick={this._sortRowsBy.bind(null, headerName)}>{headerName}</div>
        );
     },

    filterChange: function(filter, filterType) {
        var that = this;
        var onSuccess = function (filteredEvents) {
            that.props.updateAppStatus('filteredEventList', filteredEvents);
            var eventListData = that.props.eventListData;
            eventListData['filters'][filterType] = filter;
            that.props.updateAppStatus('filters', eventListData);
        };
        var onError = function() {
            console.log("Error on fetching event!");
        }
        UTILS.rest.getFilteredEntries('filteredEvents', filter, null, null, onSuccess, onError);
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

    selectCategory: function(category) {
        this.setState({
            selectedCategory: category
        });
        this.filterChange(category, "category");
    },

    createEventListTable: function(eventList) {
        var _this = this;

        if(eventList.length > 0) {
            return (
                <table className="eventList-table">
                    <tbody key="tableBody">
                        {this.createEventListRows(eventList)}
                    </tbody>
                </table>
            );
        } else {
            return <div>No events found.</div>
        }
    },

    createEventListRows: function(eventList) {
        var _this = this;
        var items = [];
        items.push(
            <tr key="z">
                <th key="x"></th>
                <th key="y">{this._renderHeader("Name")}</th>
                <th key="v">{this._renderHeader("Attendances")}</th>
             </tr>
            );
        eventList.map(function(event) {
            items.push(
                <tr key={event.id}>
                    <td key={"a"+event.id}><div id="eventListMapIconContainer" onClick={_this.centerMapToMarker.bind(null, event.id, -1)}><img src="../../assets/seeya_marker.png" width="25px" height="25px"></img></div></td>
                    <td key={"b"+event.id}>{_this.cellRenderer("name", event.name, event.id)}</td>
                    <td key={"c"+event.id}>{event.Attendances.length}</td>                            
                </tr>
            );
        });
        return items;
    },



    render: function() {
        var _this = this;

        // Use eventList if filteredEventList is empty
        var eventList = this.props.filteredEventList;
        var eventListData = this.props.eventListData;
        var sortDirArrow = '';
        var sortBy = eventListData.sortBy;
        var sortDir = eventListData.sortDir;

        if (sortDir !== null){
            sortDirArrow = sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
        }

        var selectedCategory = this.props.eventListData['filters'].category;

        var eventListTable = this.createEventListTable(eventList);

        var toTimestamp = eventListData['filters'].toTimestamp;
        var fromTimestamp = eventListData['filters'].fromTimestamp;
        var fromDate = Moment.unix(fromTimestamp).format("DD.MM.YYYY");
        var toDate = Moment.unix(toTimestamp).format("DD.MM.YYYY");


        //var fromDate = moment.unix(value).format("MM/DD/YYYY");

        // Display loading text while loading eventList
        //if($.isEmptyObject(eventList)) {
        //  return (
        //      <div>"Loading..."</div>
    //          )
        // Return event table with real data
        //} else {
            return (
                <div>
                    <h2 className="topic">Events</h2>
                        {eventListTable}
                    <div className="eventList-filter-bar">
                        <span id="select-dropdown">
                            <Dropdown
                                singleRow={true}
                                categoriesContentId={"categoriesContentEventList"}
                                list={this.state.categories}
                                selectCategory={this.selectCategory}
                                selected={selectedCategory} />
                        </span>
                    </div>
                </div>              
                )       
        }   
});

module.exports = EventList;