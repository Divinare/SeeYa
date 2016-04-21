var Router = require('react-router');
var Moment = require('moment');

var EventListDropdown = require('./eventListDropdown.js');
//var Dateselect = require('../dateselect.js');
//var DatePicker = require('../datepicker.js');
import { browserHistory } from 'react-router'

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const EventList = React.createClass({

    getInitialState: function() {
        var eventListData = this.props.eventListData;
        var selectedCategory = eventListData['filters'].category;
        return {
            showAllCategories: true
        }
    },

    componentDidMount: function() {
        this.setToolbarIcons();
        this.setToolbarStyles();
        this.props.handleResize();
        var that = this;
    },

    setToolbarIcons: function() {
        var toolbarComponentData = {}
        this.props.updateToolbarIcons(toolbarComponentData);
    },

    setToolbarStyles: function() {
        $("#toolbarContainer").css("border", "none");
    },

    resetToolbarStyles: function() {
        $("#toolbarContainer").css("border-bottom", "solid 1px #CBCED2");
    },

    componentWillMount: function() {
    },

    componentWillUnmount: function() {
        this.resetToolbarStyles();
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

     _renderHeader: function(headerName, sortBy) {

        if(headerName == "Attendances") {
            return (
                <div className='link' id="eventListPeopleIcon" onClick={this._sortRowsBy.bind(null, sortBy)}></div>
            );
        }

        return (
            <div className='link' onClick={this._sortRowsBy.bind(null, sortBy)}>{headerName}</div>
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

    showOrHideAllCategories: function(show) {
        var eventListData = this.props.eventListData;
        
        for(var filter in eventListData['filters']) {
            eventListData['filters'][filter] = show;
        }
        this.props.updateAppStatus('eventListData', eventListData);
        this.setState({
            showAllCategories: show
        })
        console.log("UPDATED EVENTLIST DATA");
        console.log(eventListData);
        this.props.getEvents();
    },

    setShowAllCategories: function(show) {
        this.setState({
            showAllCategories: show
        })
    },

    createEventListTable: function(eventList) {
        var _this = this;

        if(eventList.length > 0) {
            return (
                <table className="eventListTable">
                    <tbody key="tableBody">
                        {this.createEventListRows(eventList)}
                    </tbody>
                </table>
            );
        } else {
            return <div>No events found. You can find more events by adding more categories from the button below.</div>
        }
    },

    _formatTimestamp: function(timestamp) {
        return Moment.unix(timestamp/1000).format("DD.MM.YYYY");

    },

    createEventListRows: function(eventList) {
        var _this = this;
        var items = [];
        items.push(
            <tr key="z">
                <th className="eventListItem" key="x"></th>
                <th className="eventListItem" key="y">{this._renderHeader("Name", "name")}</th>
                <th className="eventListItem" key="c">{this._renderHeader("Attendances", "attendances")}</th>
                <th className="eventListItem" key="v">{this._renderHeader("When", "timestamp")}</th>
             </tr>
            );

        eventList.map(function(event) {
            items.push(
                <tr key={event.id}>
                    <td className="eventListItem" key={"a"+event.id}><div id="eventListMapIconContainer" onClick={_this.centerMapToMarker.bind(null, event.id, -1)}></div></td>
                    <td className="eventListItem" key={"b"+event.id}>{_this.cellRenderer("name", event.name, event.id)}</td>
                    <td className="eventListItem" key={"c"+event.id}>{event.Attendances.length}</td>
                    <td className="eventListItem" key={"d"+event.id}>{_this._formatTimestamp(event.timestamp)}</td>                            
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
                <div id="eventListContainer">
                    <h2 id="eventListTopic">Events</h2>

                    <div id="eventListTableContainer">
                        {eventListTable}
                    </div>

                    <div id="eventListBottomBar">
                        <EventListDropdown
                            showAllCategories={this.state.showAllCategories}
                            updateAppStatus={this.props.updateAppStatus}
                            getEvents={this.props.getEvents}
                            eventListData={this.props.eventListData}
                            list={this.props.categories}
                            showOrHideAllCategories={this.showOrHideAllCategories}
                            setShowAllCategories={this.setShowAllCategories} />
                    </div>
                </div>              
                )       
        }   
});

module.exports = EventList;