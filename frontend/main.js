window.$ = window.jQuery = require('jquery');
window.CONFIGS = require('./configs/config.js')
window.UTILS = require('./js/utils');
window.URL = UTILS.url;
window.React = require('react');
window.ReactDOM = require('react-dom');

//var GoogleMapsLoader = require('google-maps');
var Moment = require('moment');


var Frontpage = require('./js/frontpage.js');
var Navbar = require('./js/navbar.js');
var Map = require('./js/map/map.js');
var About = require('./js/about.js');
var NoMatch = require('./js/noMatch.js');
var EventList = require('./js/event/eventList.js');
var EventForm = require('./js/event/eventForm.js');
var EventPage = require('./js/event/eventPage.js');


//import Router from 'react-router';

import { render } from 'react-dom'
//import { Router, Route, Link, browserHistory } from 'react-router'

import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

//var Router = require('react-router')
//var RouteHandler = Router.RouteHandler;
//var Route = Router.Route;
//var DefaultRoute = Router.DefaultRoute;
//var BrowserHistory = Router.History;


$(document).click(function() {
        $("#categories-content").slideUp(150, function(){
    });
});

const Main = React.createClass({

    getInitialState: function() {
        var currentTimestamp = Moment().unix()
        var nextMonthTimestamp = Moment().add('months', 1)/1000;

        var eventListData = [];
        eventListData['tableHeight'] = 0;
        eventListData['tableWidth'] = 0;
        eventListData['sortBy'] = 'name';
        eventListData['sortDir'] = null;
        eventListData['filters'] = {
            category: "Sports",
            fromTimestamp: currentTimestamp,
            toTimestamp: nextMonthTimestamp
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
            //var filteredEventList = UTILS.eventFilter.filterColumns(eventList, eventListData);
            that.setState({
                eventList: eventList,
                filteredEventList: eventList
            })
        }
        /*
        var categoryFilter = {
            name: "category",
            value: this.state.eventListData['filters'].category
        };
        */
        console.log("going to get events??");
        var categoryFilter = this.state.eventListData['filters'].category;

        // TODO:
        UTILS.rest.getFilteredEntries('filteredEvents', categoryFilter, null, null, onSuccess);
        //UTILS.rest.getAllEntries('events', onSuccess);


    },

    updateAppStatus: function(propName, newValue) {
        var state = {};
        state[propName] = newValue;
        this.setState(state);
    },

    render: function() {
        console.log("FORWARD!");
        browserHistory.goForward();
        var that = this;
        var showFrontpage = this.state.showFrontpage;
        var frontpageLoaded = this.state.frontpageLoaded;

        var childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, {
                eventList: that.state.eventList,
                filteredEventList: that.state.filteredEventList,
                eventListData: that.state.eventListData,
                newEventMarker: that.state.newEventMarker,
                handleResize: that.handleResize,
                updateAppStatus: that.updateAppStatus,
                getEvents: that.getEvents
            })
        });

        return (
            <div>

                <Navbar />

                <div className="content">
                    <Map
                        eventList={this.state.eventList}
                        filteredEventList={this.state.filteredEventList}
                        newEventMarker={this.state.newEventMarker}
                        markers={this.state.markers}
                        
                        handleResize={this.handleResize}
                        updateAppStatus={this.updateAppStatus} />

                        {childrenWithProps}
                        
                </div>  
                
            </div>
        );
    
    }
});   

render((
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={EventList} />
            <Route name="eventPage" path="events/:id" component={EventPage} />
            <Route name="eventEdit" path="events/:id/edit" component={EventForm} />
            <Route name="eventForm" path="eventForm" component={EventForm} />
            <Route name="about" path="about" component={About} />
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.getElementById('app-container'));