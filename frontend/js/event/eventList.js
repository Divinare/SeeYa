var Router = require('react-router');
var Moment = require('moment');

var FixedDataTable = require('fixed-data-table');

var Dropdown = require('../dropdown.js');

var ReactBootstrap = require('react-bootstrap')
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var MenuItem = ReactBootstrap.MenuItem;
var SplitButton = ReactBootstrap.SplitButton;


var colours =  ["Sports", "Arts & Culture", "Beer", "Dancing", "Fitness", "Food & Drink", "Games", "Movies", "Parents & Family", "Photography", "Singles", "Other"]; 

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
        return {
            selectedCategory: colours[0]
        }
    },

    componentDidMount: function() {
        this.props.handleResize();
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
/*
    cellRenderer: function(e, col, e3, row, e5, e6) {
        var eventList = this.props.filteredEventList;

        var eventId = eventList[row]["id"];
        
        var content = UTILS.eventParser.getValue(eventList[row], contentName);
        var className = '';
        if(headerName == 'name' || headerName == 'address') {
            className = 'link';
        }
        return <div className={className} styles={{height: '100%'}} onClick={this.handleCellClick.bind(null, headerName, eventId)}>{content}</div>
    },
*/

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

    filterChange: function(tableHeader) {
        
        return function (e) {
           var value = e.target.value;
           var eventList = this.props.eventList;
           var eventListData = this.props.eventListData;
           var filteredRows = UTILS.eventFilter.filterColumn(eventList, eventListData, tableHeader, value);

           this.props.updateAppStatus('filteredEventList', filteredRows);
           eventListData['filters'][tableHeader] = value;
           this.props.updateAppStatus('filters', eventListData);
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

    selectCategory: function(category) {
        this.setState({
            selectedCategory: category
        });
        console.log("selected category " + category);
    },

    render: function() {
        var that = this;

        // Use eventList if filteredEventList is empty
        var eventList = this.props.filteredEventList;
        var eventListData = this.props.eventListData;
        var sortDirArrow = '';
        var sortBy = eventListData.sortBy;
        var sortDir = eventListData.sortDir;

        if (sortDir !== null){
          sortDirArrow = sortDir === SortTypes.DESC ? ' ↓' : ' ↑';
        }

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

                   <table className="eventList-table">
                        <tr>
                            <th></th>
                            <th>{this._renderHeader("Name")}</th>
                            <th>{this._renderHeader("Attendances")}</th>
                        </tr>
                        {eventList.map(function(event) {
                            return (
                            <tr>
                                <td>x</td>
                                <td>{that.cellRenderer("name", event.name, event.id)}</td>
                                <td>{event.Attendances.length}</td>                            
                            </tr>
                        );
                        })}
                    </table>
                    <div className="eventList-filter-bar">
                        <span id="select-dropdown">
                            <Dropdown list={colours} selectCategory={this.selectCategory} selected={this.state.selectedCategory} />
                        </span>
                        <div id="select-start-time">2.2.2016</div>
                    </div>   


                </div>              
                )       
        }   
});

module.exports = EventList;

/*
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
