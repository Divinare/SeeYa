var Router = require('react-router');
var Moment = require('moment');

var FixedDataTable = require('fixed-data-table');

var Dropdown = require('../dropdown.js');
//var Dateselect = require('../dateselect.js');
var DatePicker = require('../datepicker.js');
var ReactBootstrap = require('react-bootstrap')
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var MenuItem = ReactBootstrap.MenuItem;
var SplitButton = ReactBootstrap.SplitButton;

//var Table = FixedDataTable.Table;
//var Column = FixedDataTable.Column;

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
            console.log(categories);
        };
        var onError = function() {
            console.log("Error on fetching event!");
        }
        UTILS.rest.getAllEntries('category', onSuccess, onError);
    },

    componentWillMount :function() {
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
            console.log("got filtered events");
            console.log(filteredEvents);
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

/*
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
    */

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
        console.log("at createEventListTable");
        console.log(eventList);
        console.log("LENGTH!!! " + eventList.length);

        if(eventList.length > 0) {
            return (
                <table className="eventList-table">
                    <tbody>
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
            <tr>
                <th></th>
                <th>{this._renderHeader("Name")}</th>
                <th>{this._renderHeader("Attendances")}</th>
             </tr>
            );
        eventList.map(function(event) {
            items.push(
                <tr>
                    <td>x</td>
                    <td>{_this.cellRenderer("name", event.name, event.id)}</td>
                    <td>{event.Attendances.length}</td>                            
                </tr>
            );
        });
        return items;
    },

    changeDate: function(field) {
        console.log("at changeDate: " + field);
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
        console.log(eventListTable);

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
                <div className="right-container">


                    <h2 className="topic">Events</h2>
                        {eventListTable}
                    <div className="eventList-filter-bar">
                        <span id="select-dropdown">
                            <Dropdown list={this.state.categories} selectCategory={this.selectCategory} selected={selectedCategory} />
                        </span>
                            <form>
                            <DatePicker defaultValue="1/1/2000"/>
                            </form>
                    </div>


                </div>              
                )       
        }   
});

module.exports = EventList;

/*

                        <Dateselect
                          selectDivId="select-fromTimestamp"
                          defaultValue="22.2.2016"
                          />
                        <Dateselect
                        selectDivId="select-toTimestamp"
                        defaultValue="22.2.2016" />




{eventList.map(event =>
                            <tr>
                                <td>x</td>
                                <td>{_this.cellRenderer("name", event.name, event.id)}</td>
                                <td>{event.Attendances.length}</td>                            
                            </tr>
                        )}   






                        <Dropdown list={colours} selected={colours[0]} />

                        <div className="btn-group dropup">
                            <button className="btn">Dropup</button>
                            <button className="btn dropdown-toggle" data-toggle="dropdown">
                            <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="#">Sports</a></li>
                                <li><a href="#">Meeting up..a.</a></li>
                            </ul>
                        </div>
                        */

/* OLD TABLE CODE, dont remove. Let Joe remove

{this.renderFilterFields()}
                <div className="right-container">
                    <h2 className="topic">Events</h2>
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

                    */
