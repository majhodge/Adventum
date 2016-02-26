/*
 * Google Maps to be used in the home screen
 */

var map;
var infoWindow;
var myLocation;

function initMap() {
    'use strict';
    $.get("/mapjson", callback);

    var styles = [{
        "featureType": "water",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#b5cbe4"
        }]
    }, {
        "featureType": "landscape",
        "stylers": [{
            "color": "#efefef"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "color": "#83a5b0"
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#bdcdd3"
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#e3eed3"
        }]
    }, {
        "featureType": "administrative",
        "stylers": [{
            "visibility": "on"
        }, {
            "lightness": 33
        }]
    }, {
        "featureType": "road"
    }, {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [{
            "visibility": "on"
        }, {
            "lightness": 20
        }]
    }, {}, {
        "featureType": "road",
        "stylers": [{
            "lightness": 20
        }]
    }]

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
    });

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
        zoom: 11,
        //center: new google.maps.LatLng(55.6468, 37.581),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };

    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
        center: {
            lat: 32.881263,
            lng: -117.237547
        },
        disableDefaultUI: true,
        zoom: 10
    });
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    infoWindow = new google.maps.InfoWindow();
    myLocation = new google.maps.InfoWindow({
        map: map
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
            // The flag of where you are at 
            myLocation.setPosition(pos);
            myLocation.setContent('You Are Here!');

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function createMarker(lat, lng, name) {
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: {
            lat: lat,
            lng: lng
        }
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(name);
        infoWindow.open(map, this);
        
    });
}

function callback(result) {
    var contentString = '';
    for (var i = 0; i < result.location.length; i++) {
        //console.log(result.location[i]);
        var contentString = '<div id="content">' +
                        '<h4 id="firstHeading" class="firstHeading">' +
                        '<a href = "">' + result.location[i].name + '</a>' + '</h4>' +
                        '<img src="' + result.location[i].picture + '" align="center">' +
                        '<div id="bodyContent">' +
                        '<p><b>'+ result.location[i].username + "</b> said: " + result.location[i].message
                        '</p>' +
                        '</div>';
        
        createMarker(result.location[i].latitude, result.location[i].longitude, contentString);
    }
}
