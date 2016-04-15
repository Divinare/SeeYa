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
var Signup = require('./js/user/signup.js');
var Login = require('./js/user/login.js');
var Logout = require('./js/user/logout.js');
var Settings = require('./js/user/settings.js');
var ContactUs = require('./js/contactUs.js');
var TermsOfService = require('./js/termsOfService.js');
var RequireLogin = require('./js/user/requireLogin.js');
var AttendForm = require('./js/event/attendForm.js');

import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

$(document).click(function() {
    UTILS.helper.hideCategoryDropdownEventform();
    UTILS.helper.hideCategoryDropdownEventlist();
});

const Main = React.createClass({

    getInitialState: function() {
        var eventListData = [];
        eventListData['sortBy'] = 'name';
        eventListData['sortDir'] = null;
        eventListData['filters'] = [];
        eventListData['tableContentNames'] = ['name', 'attendances', 'streetAddress', 'timestamp'];
        
        return {
            showFrontpage: true,
            frontpageLoaded: false,
            eventList: [],
            categories: [],
            filteredEventList: [],
            eventListData: eventListData,
            newEventMarker: null,
            markers: [],
            user: null,
            loginStatusPending: true,
            showRightContainer: false
        };

    },

    componentWillMount: function() {
        this.getEvents();
        if(this.state.categories.length == 0) {
            this.getCategories();
        }
    },

    componentDidMount: function() {
        var that = this;
        this.checkLoginStatus();
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },

    checkLoginStatus: function(){
        this.setState({
            loginStatusPending:true
        })
        var that = this;
        var success = function(result) {
            console.log("is logged in");
            console.log(result)
            that.setState({
                user: result.user,
                loginStatusPending: false
            })
        }
        var error = function(){
            that.setState({
                user: null,
                loginStatusPending: false
            })
            console.log("is not logged in");
        }
         UTILS.rest.isLoggedIn(success, error);
    },

    handleResize: function(e) {
        if(typeof map !== 'undefined') {
            $("#map-canvas").css('height', UTILS.styleHelper.getMapHeight());
            $("#map-canvas").css('width', UTILS.styleHelper.getMapWidth());
            var eventListHeight = UTILS.styleHelper.getRightContainerHeight();
            var eventListWidth = UTILS.styleHelper.getRightContainerWidth();
            $(".right-container").css('height', eventListHeight);
            $(".right-container").css('width', eventListWidth);

            UTILS.styleHelper.resetRightContainer();
            UTILS.styleHelper.resizeEventList();
            UTILS.styleHelper.resizeRightContainerContent();
            
            // Are these needed? T. Joe 14.4.2016
            // google.maps.event.trigger(map,'resize');
            //   map.setZoom( map.getZoom() );
            UTILS.messageComponent.adjustMessageComponentWidth();
        }

    },

    getEvents: function() {
        console.log("AT GET EVENTS!");
        console.log("AT GET EVENTS!");
        console.log("AT GET EVENTS!");
        var that = this;
        var onSuccess = function(eventList) {
            //var filteredEventList = UTILS.eventFilter.filterColumns(eventList, eventListData);
            that.setState({
                eventList: eventList,
                filteredEventList: eventList
            })
        }
        var categoryFilters = this.state.eventListData['filters'];
        console.log("CATEGORY FILTERS: ");
        console.log(categoryFilters);
        UTILS.rest.getFilteredEntries('filteredEvents', categoryFilters, null, null, onSuccess);
    },

    getCategories: function() {
        var that = this;
        var onSuccess = function (data) {
            console.log("GOT CATEGORIES");
        var eventListData = that.state.eventListData;
        var categories = [];
        for(var index in data) {
            var category = data[index];
            console.log("CATEGORY::: " + category.name);
            categories.push(category);
            eventListData['filters'][category.name] = true;
        }
        that.setState({
            categories: categories,
            eventListData: eventListData
        })
        };
        var onError = function() {
            console.log("Error on fetching event!");
        }
        console.log("FETCHING CATEGORIES");
        UTILS.rest.getAllEntries('category', onSuccess, onError);

    },

    updateAppStatus: function(propName, newValue) {
        var state = {};
        state[propName] = newValue;
        this.setState(state);
    },

    getAppStatus: function(propName){
        return this.state[propName];
    },

    hideRightContainer: function() {
        UTILS.styleHelper.showRightContainer();
    },

    render: function() {
        var that = this;
        var showFrontpage = this.state.showFrontpage;
        var frontpageLoaded = this.state.frontpageLoaded;

        var childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, {
                eventList: that.state.eventList,
                eventListData: that.state.eventListData,
                categories: that.state.categories,
                filteredEventList: that.state.filteredEventList,
                newEventMarker: that.state.newEventMarker,
                handleResize: that.handleResize,
                updateAppStatus: that.updateAppStatus,
                getAppStatus: that.getAppStatus,
                getEvents: that.getEvents,
                user: that.state.user
            })
        });
                               
        // HOMEICON:   <Link to={"/"}><div id="homeIcon" onClick={this.show}></div></Link>
        return (
            <div className="application">
                <Navbar loginStatusPending={this.state.loginStatusPending} user={this.state.user}/>
                <div id="messageComponent"></div>
                <div className="content">
                    <Map
                        eventList={this.state.eventList}
                        filteredEventList={this.state.filteredEventList}
                        newEventMarker={this.state.newEventMarker}
                        markers={this.state.markers}
                        
                        handleResize={this.handleResize}
                        updateAppStatus={this.updateAppStatus}
                        hideRightContainer={this.hideRightContainer} />

                        <div className="right-container showing" onClick={this.hideRightContainer}>
                            <div id="rightContainerToolbar"></div>
                            <div id="rightContainerContent">
                                {childrenWithProps}
                            </div>
                            <div id="rightContainerBottomBar">
                                <Link to="/termsOfService" className="link bottomBarLink">Terms of service</Link>
                                <Link to="/contact" className="link bottomBarLink">Contact us</Link>
                            </div>

                        </div>
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
            <Route path="eventForm" component={EventForm} />
            <Route path="about" component={About} />
            <Route path="signup" component={Signup} />
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />
            <Route path="contact" component={ContactUs} />
            <Route path="termsOfService" component={TermsOfService} />
            <Route component={RequireLogin} >
                <Route path="settings" component={Settings} />
                <Route path="join/:id" component={AttendForm} />
                <Route path="events/:id/edit" component={EventForm} />
            </Route>
            <Route path="*" component={NoMatch} />
        </Route>
    </Router>
), document.getElementById('app-container'));