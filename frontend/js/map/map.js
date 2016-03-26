var React = require('react');
var Router = require('react-router');
var ContextMenu = require('./contextMenu.js');

var CreateNewEventPopup = require('./createNewEventPopup.js');
// https://developers.google.com/maps/documentation/javascript/examples/marker-animations

var Map = React.createClass({
    mixins: [ Router.Navigation ],

    getInitialState: function() {

        return {
            initialZoom: 10,
            mapCenterLat: 60,
            mapCenterLng: 20,
            openedInfowindow: {},
            markers: []
        };
    },
    componentDidMount: function () {
        this.initMap();
        this.props.handleResize();
    },

    componentWillReceiveProps: function(nextProps) {
        
        this.deleteMarkers(this.state.markers);
        var allowDrawMarkers = UTILS.helper.isAtLocation("eventForm") ? false : true;

        if(this.state != null && nextProps.filteredEventList.length > 0) {
            
            if(allowDrawMarkers) {
                this.addAllMarkers(nextProps);

                var newEventMarker = this.props.newEventMarker;
                if(!$.isEmptyObject(newEventMarker)) {
                    this.props.newEventMarker.setMap(null);
                }
            }
        }

        if(nextProps.newEventMarker == null) {
            //console.log("removing new eventMarker!");
        }   
    },

    _zoomControl: function(controlDiv, map) {
        controlDiv.className = "mapControlDiv";
        var controlWrapper = document.createElement('div');
        controlWrapper.className = "mapControlWrapper";
        controlDiv.appendChild(controlWrapper);

        var zoomInButton = document.createElement('div');
        zoomInButton.className = "mapZoomInButton";
        zoomInButton.innerHTML = '+';
        controlWrapper.appendChild(zoomInButton);

        var zoomOutButton = document.createElement('div');
        zoomOutButton.className = "mapZoomOutButton";
        zoomOutButton.innerHTML = '-';
        controlWrapper.appendChild(zoomOutButton);

        // Setup the click event listener - zoomIn
        google.maps.event.addDomListener(zoomInButton, 'click', function() {
            map.setZoom(map.getZoom() + 1);
        });

        // Setup the click event listener - zoomOut
        google.maps.event.addDomListener(zoomOutButton, 'click', function() {
            map.setZoom(map.getZoom() - 1);
        });  
    },

    initMap: function() {
        var that = this;

        var mapOptions = {
            center: { lat: 60.205294, lng: 24.936092},
            zoom: this.state.initialZoom,
            minZoom: 5,
            maxZoom: 17,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false
        };

        var map = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);       
        
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new this._zoomControl(zoomControlDiv, map);
        zoomControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);
        
        google.maps.event.addListener(map, 'click', function(event) {
            that.closeOpenedInfowindow();
            if(UTILS.helper.isAtLocation("eventForm")) {
                that.addNewEventMarker(event.latLng, map);
            }
        });

        this.centerMapToUserLocation();
    
        //  create the ContextMenuOptions object
        var contextMenuOptions={};
        contextMenuOptions.classNames={menu:'context_menu', menuSeparator:'context_menu_separator'};
        
        //  create an array of ContextMenuItem objects
        var menuItems=[];
        menuItems.push({className:'context_menu_item link', eventName:'create_event', label:'Create Event'});
        menuItems.push({className:'context_menu_item link', eventName:'zoom_in_click', label:'Zoom in'});
        menuItems.push({className:'context_menu_item link', eventName:'zoom_out_click', label:'Zoom out'});
        //  a menuItem with no properties will be rendered as a separator
        menuItems.push({});
        menuItems.push({className:'context_menu_item link', eventName:'center_map_click', label:'Center map here'});
        contextMenuOptions.menuItems=menuItems;
        
        var contextMenu = new ContextMenu(map, contextMenuOptions);
        
        //  display the ContextMenu on a Map right click
        google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
            contextMenu.show(mouseEvent.latLng);
        });
        
        //  listen for the ContextMenu 'menu_item_selected' event
        google.maps.event.addListener(contextMenu, 'menu_item_selected', function(latLng, eventName){
            switch(eventName){
                case 'create_event':
                    var latLngObj = {
                        lat: latLng.G,
                        lng: latLng.K
                    }
                    that.addNewEventMarker(latLngObj, map);
                    that.transitionToEventForm();
                    break;
                case 'zoom_in_click':
                    map.setZoom(map.getZoom()+1);
                    break;
                case 'zoom_out_click':

                    map.setZoom(map.getZoom()-1);
                    break;
                case 'center_map_click':

                    map.panTo(latLng);
                    break;
            }
        });

        window.map = map;
    },

    centerMapToUserLocation: function() {
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.centerMapLocation);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    },
    
    centerMapLocation: function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var latLng = new google.maps.LatLng(lat, lon);
        map.setCenter(latLng);
    },

    addAllMarkers: function(props) {
        var that = this;
        var filteredEventList = props.filteredEventList;
        var createdMarkers = [];

        filteredEventList.map(function(event) {
            if(!$.isEmptyObject(event)) {
                var icon = new google.maps.MarkerImage("assets/seeya_marker.png", null, null, null, new google.maps.Size(21,30));
                var marker = that.createMarker({ lat: event.lat, lng: event.lon }, map, icon);
                var infowindow =  that.createInfowindow(map, marker, event);
                google.maps.event.addListener(marker, 'click', function() {
                    that.openInfowindow(map, marker, infowindow);
                    //that.deleteNewEventMarker();
                });
                createdMarkers.push(marker);



            } else {
                console.log("... Critical error in map.js maybe.");
            }
        });
                    
        if(!$.isEmptyObject(createdMarkers)) {
//            this.props.updateAppStatus('markers', createdMarkers);
            this.setState({
                markers: createdMarkers
            })
        }



    },

    transitionToEventForm: function() {
        this.transitionTo('eventForm', {id: 10});
    },

    addNewEventMarker: function(latLng, map) {
        var that = this;
        var icon = new google.maps.MarkerImage("assets/seeya_marker_new.png", null, null, null, new google.maps.Size(21,30));

        var marker = this.createMarker(latLng, map, icon);



 


        //var infowindow =  this.createInfowindow(map, marker, null);
        //this.openInfowindow(map, marker, infowindow);

        //var pt = new google.maps.LatLng(lat, lng);
     //   map.setCenter(latLng);
     //   map.setZoom(8);
/*
        google.maps.event.addListener(infowindow, 'closeclick', function () {
            that.deleteMarker(marker);
        });
*/
        // Delete current eventMarker if there is one
        //this.deleteNewEventMarker();
        if(this.props.newEventMarker != null) {
            this.deleteMarker(this.props.newEventMarker);
        }
        // Update the new eventMarker
        this.props.updateAppStatus('newEventMarker', marker);

    },

    createMarker: function(location, map, icon) {
        var that = this;
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        if(typeof icon != 'undefined') {
            marker.setIcon(icon);
        }
        return marker;
    },

    createInfowindow: function(map, marker, event) {
        var that = this;
        var infowindowContent = '';
        if(event == null) {
            var infowindowContent = document.createElement('div');
            infowindowContent.className = "link";
            infowindowContent.innerHTML = 'Create new event here';
            infowindowContent.onclick = function(){
                that.transitionToEventForm();
            };



        } else {
            var time = UTILS.eventParser.getValue(event, 'timestamp');
            var streetAddress = UTILS.eventParser.getValue(event, 'streetAddress');
            var attendances = UTILS.eventParser.getValue(event, 'attendances');
            infowindowContent = '<h3>' + event.name + '</h3>'
                            + '<a> Join to this event</a>'
                            + '<p>' + time + '</p>'
                            + '<p>' + streetAddress + '</p>'
                            + '<p>Attendances: ' + attendances + '</p>'
                            + '<a>Zoom on map </a>';
        }

        var infowindow = new google.maps.InfoWindow({
            content: infowindowContent
        });
        return infowindow;
    },

    openInfowindow: function(map, marker, infowindow) {
        this.closeOpenedInfowindow();
        infowindow.open(map, marker);

        this.setState({
            openedInfowindow: infowindow
        });
    },

    closeOpenedInfowindow: function() {
        var openedInfowindow = this.state.openedInfowindow
        if(!$.isEmptyObject(openedInfowindow)) {
            openedInfowindow.close();
        }
     },


    deleteMarkers: function(markers) {
        markers.map(function(marker) {
            marker.setMap(null);
        });
        this.setState({
            markers: []
        })
    },

    deleteMarker: function(marker) {
        console.log("REMOVING MARKER : deleteMarker");
        marker.setMap(null);
    },

    deleteNewEventMarker: function() {
        
        var marker = this.props.newEventMarker;
        if(!$.isEmptyObject(marker)) {
            this.deleteMarker(marker);
            // Also empty the newEventMarker
                    console.log("REMOVING MARKER : deleteNewEventMarker");

            this.props.updateAppStatus('newEventMarker', {});
        } else {
        }
        
    },

    render: function(){
 
        return (
            <div id="map-canvas"></div>
        )
    }

});

module.exports = Map;