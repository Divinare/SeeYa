window.$ = window.jQuery = require('jquery');
window.CONFIGS = require('./configs/config.js')
window.UTILS = require('./js/utils');
window.URL = UTILS.url;
window.React = require('react');
window.ReactDOM = require('react-dom');

var render = require('react-dom').render;

var reactRouter = require('react-router');
var Router = reactRouter.Router;
var Route = reactRouter.Route;
var IndexRoute = reactRouter.IndexRoute;
var Link = reactRouter.Link;
var IndexLink = reactRouter.IndexLink;
var browserHistory = reactRouter.browserHistory;

window.markersHaventLoaded = true; 

var Moment = require('moment');

var Navbar = require('./js/navbar.js');
var Toolbar = require('./js/toolbar.js');
var Bottombar = require('./js/bottombar.js');
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
var AttendForm = require('./js/event/attendForm.js');
var AuthError = require('./js/user/authError.js');
var ForgotPassword = require('./js/user/forgotPassword.js');
var Verification = require('./js/user/emailVerification.js');

var RequireLogin = require('./js/user/requireLogin.js');
var RequireVerification = require('./js/user/requireVerification.js');

var initialScreenSize = window.innerHeight;

$(document).on("click", function (event) {
    UTILS.helper.hideSingeSelectDropdown(event);
    UTILS.helper.hideCategoryDropdownEventlist(event);
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
            eventList: [],
            filteredEventList: [],
            categories: [],
            eventListData: eventListData,
            newEventMarker: null,
            shownEventData: {}, // data that is shown currently to the user, if any
            user: null,
            loginStatusPending: true,
            showRightContainer: false,
            automaticFilteringAllowed: false,
            toolbarComponentData: {}
        };

    },

    componentWillMount: function() {
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
         UTILS.rest.authorization("loggedInStatus", success, error);
    },

    handleResize: function(e) {
        if(typeof map !== 'undefined') {
            $("#map-canvas").css('height', UTILS.styleHelper.getMapHeight());
            $("#map-canvas").css('width', UTILS.styleHelper.getMapWidth());
            var eventListHeight = UTILS.styleHelper.getRightContainerHeight(initialScreenSize);
            var eventListWidth = UTILS.styleHelper.getRightContainerWidth();
            $(".right-container").css('height', eventListHeight);
            $(".right-container").css('width', eventListWidth);

            UTILS.styleHelper.resetRightContainer(initialScreenSize);
            UTILS.styleHelper.resizeEventList(initialScreenSize);
            UTILS.styleHelper.resizeRightContainerContent(initialScreenSize);
            
            UTILS.messageComponent.adjustMessageComponentWidth();

            // Mobile keyboard fix
            if(UTILS.helper.isUsingMobile()) {
                var isKeyboardOn = (window.innerHeight < initialScreenSize);
                if(isKeyboardOn) {
                    $(".right-container").css("top", "20px");
                } 
            }
        }

    },

    getEvents: function() {
        var that = this;
        var onSuccess = function(eventList) {
            that.setState({
                eventList: eventList,
                filteredEventList: that._filterEventsByLocation(eventList)
            })
        }
        var onError = function() {
            that.setState({
                eventList: [],
                filteredEventList: []
            })
        }
        var categoryFilters = this.state.eventListData['filters'];
        UTILS.rest.getFilteredEntries('filteredEvents', categoryFilters, null, null, onSuccess, onError);
    },

    getCategories: function() {
        var that = this;
        var onSuccess = function (data) {
        var eventListData = that.state.eventListData;
        var categories = [];
        for(var index in data) {
            var category = data[index];
            categories.push(category);
            eventListData['filters'][category.name] = true;
        }
        that.setState({
            categories: categories,
            eventListData: eventListData
        })
        that.getEvents();
        };
        var onError = function() {
            console.log("Error on fetching event!");
        }
        UTILS.rest.getAllEntries('category', onSuccess, onError);

    },

    automaticFilterEventsByLocation: function() {
        if(!this.state.automaticFilteringAllowed) {
            // Return because app has not yet loaded all eventList data
            return;
        }
        var filteredEventList = this._filterEventsByLocation(this.state.eventList);
        this.setState({
            filteredEventList: filteredEventList
        })
    },

    _filterEventsByLocation: function(eventList) {
        if(map == null || typeof map == "undefined") {
            console.log("___ Programmer! Map not found when filtering eventList by location");
            return;
        }
        var bounds = map.getBounds();
        if(typeof bounds == "undefined") {
            return;
        }

        var latTopLeft = bounds.f.f;
        var lonTopLeft = bounds.b.b;
        var latBottomRight = bounds.f.b;
        var lonBottomRight = bounds.b.f

        var filteredEventList = [];
        eventList.map(function(event) {
            if(event.lat > latTopLeft && event.lat < latBottomRight && event.lon > lonTopLeft && event.lon < lonBottomRight) {
                filteredEventList.push(event);
            }
            
        });
        return filteredEventList;
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

    updateToolbarIcons: function(updateToolbarIcons) {
        this.refs.toolbar.updateToolbarIcons(updateToolbarIcons);
    },

    render: function() {
        var that = this;
        var showFrontpage = this.state.showFrontpage;

        var childrenWithProps = React.Children.map(this.props.children, function(child) {
            return React.cloneElement(child, {
                eventList: that.state.eventList,
                eventListData: that.state.eventListData,
                categories: that.state.categories,
                filteredEventList: that.state.filteredEventList,
                newEventMarker: that.state.newEventMarker,
                user: that.state.user,
                getAppStatus: that.getAppStatus,
                getEvents: that.getEvents,
                handleResize: that.handleResize,
                updateAppStatus: that.updateAppStatus,
                updateToolbarIcons: that.updateToolbarIcons
            })
        });

        return (
            <div className="application">
                <Navbar loginStatusPending={this.state.loginStatusPending} user={this.state.user}/>
                <div id="messageComponent"></div>
                <div className="content">
                    <Map
                        eventList={this.state.eventList}
                        filteredEventList={this.state.filteredEventList}
                        newEventMarker={this.state.newEventMarker}
                        shownEventData={this.state.shownEventData}

                        handleResize={this.handleResize}
                        updateAppStatus={this.updateAppStatus}
                        hideRightContainer={this.hideRightContainer}
                        automaticFilterEventsByLocation={this.automaticFilterEventsByLocation} />

                        <div className="right-container showing" onClick={this.hideRightContainer}>
                            <div id="rightContainerToolbar">
                                <Toolbar
                                    ref={'toolbar'}/>
                            </div>
                            <div id="rightContainerContent">
                                {childrenWithProps}
                            </div>
                            <Bottombar />
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
            <Route path="about" component={About} />
            <Route path="signup" component={Signup} />
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />
            <Route path="contact" component={ContactUs} />
            <Route path="termsOfService" component={TermsOfService} />
            <Route path="authError/:message" component={AuthError}/>
            <Route path="forgotPassword" component={ForgotPassword}/>
            <Route component={RequireLogin} >
                <Route path="settings" component={Settings} />
                <Route path="emailVerification" component={Verification} />
                <Route component={RequireVerification} >
                    <Route path="eventForm" component={EventForm} />
                    <Route path="join/:id" component={AttendForm} />
                    <Route path="events/:id/edit" component={EventForm} />
                </Route>
            </Route>
            <Route path="*" component={NoMatch} />
        </Route>
    </Router>
), document.getElementById('app-container'));