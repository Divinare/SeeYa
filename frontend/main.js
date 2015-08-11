window.$ = window.jQuery = require('jquery');
window.REST = require('./js/url.js');

var React = require('react');
//var GoogleMapsLoader = require('google-maps');

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
        eventListData['sortBy'] = 'name';
        eventListData['sortDir'] = null;
        eventListData['filters'] = [];
        eventListData['tableContentNames'] = ['name', 'attendances', 'streetAddress', 'timestamp'];
        
        return {
            eventList: [],
            filteredEventList: [],
            eventListData: eventListData
        };

    },
    componentWillMount: function() {

        var that = this;
        $.ajax({ 
            type: 'GET', 
            url: REST.allEvents,
            dataType: 'json',
            success: function (eventList) { 
              that.setState({
                eventList: eventList,
                filteredEventList: eventList
              })
            }
        });

    },
    /* Parses eventList to contain only the things that EventList needs 
       in a array['property'] format (so no arrays inside arrays) */
   /*
    parseEventList: function(eventList) {
        console.log(eventList);
        var that = this;
        var parsedEventList = [];

        eventList.map(function(event) {
            var newEvent = {};
            for(var prop in event) {
                var propName = prop;
                prop = prop.toLowerCase();
                // Only push in parsed eventList if prop is id or it is in tableHeaders list
                if(prop == 'id' || $.inArray(prop, that.state.eventListData['tableHeaders']) != -1) {
                    
                    console.log(propName);
                    // Special handler for Address object
                    if(propName == 'Address') {
                        newEvent[prop] = event[propName].streetAddress;
                    // Special handler for Attendances object
                    } else if(propName == 'Attendances') {
                        newEvent[prop] = event[propName].length;
                    } else {

                    newEvent[prop] = event[propName];
                    }
                }
            }
            parsedEventList.push(newEvent);

        });
        console.log("-------------------------------");
        console.log(parsedEventList);


        return parsedEventList;
    },
    */

    componentDidMount: function() {
        console.log("comppppppppppp");
    },

    updateEventList: function(eventList) {
        this.setState({
            eventList: eventList
        })
    },

    updateFilteredEventList: function(filteredEventList) {
        console.log("UPDDDDD");
        this.setState({
            filteredEventList: filteredEventList
        })
        this.forceUpdate();
    },

    updateEventListData: function(key, value, array) {
        var currentData = this.state.eventListData;
        console.log("update eventListData, key: " + key + " value: " + value + " array: " + array);
        if(typeof array != 'undefined') {
            currentData[array][key] = value
        } else {
            currentData[key] = value;
        }
        this.setState({
            eventListData: currentData
        })
    },


    render: function() {

    return (
          <div>
            <Header />
            <Map
              google={this.state.google}
              eventList={this.state.eventList}
              filteredEventList={this.state.filteredEventList} />

            <div className="container">
                <RouteHandler
                  eventList={this.state.eventList}
                  filteredEventList={this.state.filteredEventList}
                  eventListData={this.state.eventListData}
                  updateEventList={this.updateEventList}
                  updateFilteredEventList={this.updateFilteredEventList}
                  updateEventListData={this.updateEventListData} />
            </div>
        </div>
    );
    }
    });  // <RouteHandler {...@props}/>

    var EventListsWrapper = React.createClass({

        render: function () {
            return (
                <EventList
                  eventList={this.props.eventList}
                  filteredEventList={this.props.filteredEventList}
                  eventListData={this.props.eventListData}
                  updateEventList={this.props.updateEventList}
                  updateFilteredEventList={this.props.updateFilteredEventList}
                  updateEventListData={this.props.updateEventListData} />
            );
        }
    });
/*

    var MapWrapper = React.createClass({
        render: function () {
            return (
                <Map eventList={this.props.eventList}
                     filteredEventList={this.props.filteredEventList} />
            );
        }
    });
*/
    var routes = (
        <Route handler={Main} path="/">
        <Route name="home" path="/" handler={EventListsWrapper} />
        <Route name="eventPage" path="events/:id" handler={EventPage} />
        <Route name="eventForm" handler={EventForm} />
        <Route name="about" handler={About} />
        <Route path="*" handler={NoMatch}/>
        </Route>
    );

$(document).ready(function () {
    Router.run(routes, Router.HistoryLocation, function (Handler) {
        React.render(<Handler/>, document.body);
    });
});