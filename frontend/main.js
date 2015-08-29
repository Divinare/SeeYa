window.$ = window.jQuery = require('jquery');
window.CONFIGS = require('./configs/config.js')
window.UTILS = require('./js/utils');
window.REST = UTILS.url;

var React = require('react');
//var GoogleMapsLoader = require('google-maps');

var environment = require('./configs/environment.js');


var Header = require('./js/header.js');
var Map = require('./js/map/map.js');
var About = require('./js/about.js');
var NoMatch = require('./js/noMatch.js');
var EventList = require('./js/event/eventList.js');
var EventForm = require('./js/event/eventForm.js');
var EventPage = require('./js/event/eventPage.js');

var Router = require('react-router')
  , RouteHandler = Router.RouteHandler
  , Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , BrowserHistory = Router.History;

var Main = React.createClass({

    getInitialState: function() {

        var eventListData = [];
        eventListData['tableHeight'] = 0;
        eventListData['tableWidth'] = 0;
        eventListData['sortBy'] = 'name';
        eventListData['sortDir'] = null;
        eventListData['filters'] = [];
        eventListData['tableContentNames'] = ['name', 'attendances', 'streetAddress', 'timestamp'];
        
        return {
            eventList: [],
            filteredEventList: [],
            eventListData: eventListData,
            newEventMarker: {},
            markers: []
        };

    },
    componentWillMount: function() {
        var that = this;
        var onSuccess = function(eventList) {
              that.setState({
                eventList: eventList,
                filteredEventList: eventList
              })
        }
        UTILS.rest.getAllEvents(onSuccess);

    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },

    handleResize: function(e) {
        $("#map-canvas").css('height', UTILS.styleHelper.getMapHeight());
        $("#map-canvas").css('width', UTILS.styleHelper.getMapWidth());
        var eventListHeight = UTILS.styleHelper.getEventListHeight();
        var eventListWidth = UTILS.styleHelper.getEventListWidth();
        $(".right-container").css('height', eventListHeight);
        $(".right-container").css('width', eventListWidth);

        this.updateEventListData('tableHeight', eventListHeight);
        this.updateEventListData('tableWidth', eventListWidth);
        
        google.maps.event.trigger(map,'resize');
        map.setZoom( map.getZoom() );

    },

    updateAppStatus: function(propName, newValue) {
        console.log("upd app status!!");
        var state = {};
        state[propName] = newValue;
        this.setState(state);
    },

    updateEventListData: function(key, value, array) {
        var currentData = this.state.eventListData;
        if(typeof array != 'undefined') {
            currentData[array][key] = value
        } else {
            currentData[key] = value;
        }
        this.setState({
            eventListData: currentData
        })
    },

    addEventToFilteredEventList: function(event) {
        var filteredEventList = this.state.filteredEventList.slice();    
        filteredEventList.push(event);   
        this.setState({filteredEventList: filteredEventList})
    },

    render: function() {

        return (
              <div>
                <Header />

                <div className="content">
                    <Map
                        google={this.state.google}
                        eventList={this.state.eventList}
                        filteredEventList={this.state.filteredEventList}
                        newEventMarker={this.state.newEventMarker}
                        markers={this.state.markers}
                        
                        updateAppStatus={this.updateAppStatus} />

                    
                    <RouteHandler
                        eventList={this.state.eventList}
                        filteredEventList={this.state.filteredEventList}
                        eventListData={this.state.eventListData}
                        newEventMarker={this.state.newEventMarker}

                        handleResize={this.handleResize}
                        updateAppStatus={this.updateAppStatus}
                        updateEventListData={this.updateEventListData}
                        addEventToFilteredEventList={this.addEventToFilteredEventList} />
                </div>    
            </div>
        );
    }
});

var EventListsWrapper = React.createClass({

    render: function () {
        return (
            <EventList
                eventList={this.props.eventList}
                filteredEventList={this.props.filteredEventList}
                eventListData={this.props.eventListData}

                updateAppStatus={this.props.updateAppStatus}
                updateEventListData={this.props.updateEventListData} />
        );
    }
});

var EventFormWrapper = React.createClass({

    render: function () {
        return (
            <EventForm
                newEventMarker={this.props.newEventMarker}

                handleResize={this.props.handleResize}
                updateAppStatus={this.props.updateAppStatus}
                addEventToFilteredEventList={this.props.addEventToFilteredEventList} />
        );
    }
});

var EventPageWrapper = React.createClass({

    render: function () {
        return (
            <EventPage
                handleResize={this.props.handleResize}
                updateAppStatus={this.props.updateAppStatus} />
        );
    }
});



    var routes = (
        <Route handler={Main} path="/">
        <Route name="home" path="/" handler={EventListsWrapper} />
        <Route name="eventPage" path="events/:id" handler={EventPage} />
        <Route name="eventForm" path="eventForm" handler={EventFormWrapper} />
        <Route name="about" handler={About} />
        <Route path="*" handler={NoMatch}/>
        </Route>
    );

$(document).ready(function () {
    Router.run(routes, Router.HistoryLocation, function (Handler) {
        React.render(<Handler/>, document.body);
    });
});