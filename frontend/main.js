window.$ = window.jQuery = require('jquery');
window.CONFIGS = require('./configs/config.js')
window.UTILS = require('./js/utils');
window.URL = UTILS.url;
window.React = require('react');
window.ReactDOM = require('react-dom');

var Moment = require('moment');

var Frontpage = require('./js/frontpage.js');
var Navbar = require('./js/navbar.js');
var Map = require('./js/map/map.js');
var About = require('./js/about.js');
var NoMatch = require('./js/noMatch.js');
var EventList = require('./js/event/eventList.js');
var EventForm = require('./js/event/eventForm.js');
var EventPage = require('./js/event/eventPage.js');
var Signup = require('./js/signup.js')
var Login = require('./js/login.js')
var Settings = require('./js/settings.js')

import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

$(document).click(function() {
    var eventTarget = $(event.target)[0];
    var shouldHideEventForm = true;
    if(typeof eventTarget != 'undefined' && eventTarget != null) {
        if(eventTarget.className == "eventFormListRow") {
            shouldHideEventForm = false;
        }
    }
    if(shouldHideEventForm) {
        $("#categoryContentEventform").slideUp(150, function(){ });
    }

    $("#categoriesContentEventList").slideUp(150, function(){ });
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
            newEventMarker: null,
            markers: [],
            loggedIn: false,
            username:''
        };

    },

    componentWillMount: function() {
        console.log("GETTING EVENTS");
        this.getEvents();
    },

    componentDidMount: function() {
        var that = this;
        var success = function() {
            console.log("is logged in");
            that.setState({
                loggedIn: true
             //   username: 
            })
        }
        var error = function(){
            console.log("is not logged in");
        }
        UTILS.rest.isLoggedIn(success, error);

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

            console.log(eventListHeight);

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
            <div className="application">

                <Navbar loggedIn={that.state.loggedIn} username={that.state.username}/>

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
            <Route path="events/:id" component={EventPage} />
            <Route path="events/:id/edit" component={EventForm} />
            <Route path="eventForm" component={EventForm} />
            <Route path="about" component={About} />
            <Route path="signup" component={Signup} />
            <Route path="login" component={Login} />
            <Route path="settings" component={Settings} />
            <Route path="*" component={NoMatch} />
        </Route>
    </Router>
), document.getElementById('app-container'));