window.$ = window.jQuery = require('jquery');
window.CONFIGS = require('./configs/config.js')
window.UTILS = require('./js/utils');
window.URL = UTILS.url;
window.React = require('react');

//var GoogleMapsLoader = require('google-maps');

var Frontpage = require('./js/frontpage.js');
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


$(document).click(function() {
        $("#categories-content").slideUp(150, function(){
    });
});

var Main = React.createClass({

    getInitialState: function() {

        var eventListData = [];
        eventListData['tableHeight'] = 0;
        eventListData['tableWidth'] = 0;
        eventListData['sortBy'] = 'name';
        eventListData['sortDir'] = null;
        eventListData['filters'] = {
            name: "",
            attendances: "",
            streetAddress: "",
            timestamp: ""
        };
        eventListData['tableContentNames'] = ['name', 'attendances', 'streetAddress', 'timestamp'];
        
        return {
            showFrontpage: true,
            frontpageLoaded: false,
            eventList: [],
            filteredEventList: [],
            eventListData: eventListData,
            newEventMarker: {},
            markers: []
        };

    },
    componentWillMount: function() {
        this.getEvents();
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },

    handleResize: function(e) {
        if(typeof map !== 'undefined') {
            $("#map-canvas").css('height', UTILS.styleHelper.getMapHeight());
            $("#map-canvas").css('width', UTILS.styleHelper.getMapWidth());
            var eventListHeight = UTILS.styleHelper.getEventListHeight();
            var eventListWidth = UTILS.styleHelper.getEventListWidth();
            $(".right-container").css('height', eventListHeight);
            $(".right-container").css('width', eventListWidth);

            var eventListData = this.state.eventListData;
            eventListData['tableHeight'] = eventListHeight;
            eventListData['tableWidth'] = eventListWidth;
            this.updateAppStatus('eventListData', eventListData);
            
            google.maps.event.trigger(map,'resize');
            map.setZoom( map.getZoom() );
        }

    },

    getEvents: function() {
        var that = this;
        var onSuccess = function(eventList) {
            var eventListData = that.state.eventListData;
            var filteredEventList = UTILS.eventFilter.filterColumns(eventList, eventListData);
            that.setState({
                eventList: eventList,
                filteredEventList: filteredEventList
            })
        }
        UTILS.rest.getAllEntries('event', onSuccess);
    },

    updateAppStatus: function(propName, newValue) {
        var state = {};
        state[propName] = newValue;
        this.setState(state);
    },

    render: function() {
        var that = this;
        var showFrontpage = this.state.showFrontpage;
        var frontpageLoaded = this.state.frontpageLoaded;

        return (
            <div>

                <Header />

                <div className="content">
                    <Map
                        eventList={this.state.eventList}
                        filteredEventList={this.state.filteredEventList}
                        newEventMarker={this.state.newEventMarker}
                        markers={this.state.markers}
                        
                        handleResize={this.handleResize}
                        updateAppStatus={this.updateAppStatus} />
                    <RouteHandler
                        eventList={this.state.eventList}
                        filteredEventList={this.state.filteredEventList}
                        eventListData={this.state.eventListData}
                        newEventMarker={this.state.newEventMarker}

                        handleResize={this.handleResize}
                        updateAppStatus={this.updateAppStatus}
                        getEvents={this.getEvents} />
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

                handleResize={this.props.handleResize}
                updateAppStatus={this.props.updateAppStatus} />
        );
    }
});

var EventFormWrapper = React.createClass({

    render: function () {
        return (
            <EventForm
                newEventMarker={this.props.newEventMarker}

                handleResize={this.props.handleResize}
                getEvents={this.props.getEvents}
                updateAppStatus={this.props.updateAppStatus} />
        );
    }
});

var EventPageWrapper = React.createClass({

    render: function () {
        return (
            <EventPage
                handleResize={this.props.handleResize}
                getEvents={this.props.getEvents}
                updateAppStatus={this.props.updateAppStatus} />
        );
    }
});



    var routes = (
        <Route handler={Main} path="/">
        <Route name="home" path="/" handler={EventListsWrapper} />
        <Route name="eventPage" path="events/:id" handler={EventPage} />
        <Route name="eventEdit" path="events/:id/edit" handler={EventFormWrapper} />
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