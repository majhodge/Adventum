/*
 * Google Maps to be used in the home screen
 */

var map;
var infoWindow;
var placesArray = [];
var currentPlace = 0;
var infowin;
var counter = 0;

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
        center: new google.maps.LatLng(55.6468, 37.581),
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
        zoom: 12
    });
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    infoWindow = new google.maps.InfoWindow({
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
            infoWindow.setPosition(pos);
            infoWindow.setContent('You Are Here!');

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function locationCallback(result) {
    var place = placesArray[currentPlace];
    currentPlace++;
    console.log(result);

    createEventMarker(map, infoWindow, location.username, location.name, location.city, location.latitude, location.longitude);
}

function createEventMarker(map, infoWindow, username, name, city, lat, lng) {

    var latitude = parseFloat(lat);
    var longitude = parseFloat(lng);

    console.log(latitude);
    console.log(longitude);

    var markerTemp = new google.maps.Marker({
        map: map,
        position: {
            lat: latitude,
            lng: longitude
        },
        name: name
    });

    // var  contentString = '<div id="content">' +
    //     '<h3 id="firstHeading" class="firstHeading">' +
    //     '<a href = "project.handlebars">' + name + '</a>' + '</h3>' +
    //     '<div id="bodyContent">' +
    //     '<p>' + type +
    //     '</p>' +
    //     '</div>';

    infowin = new google.maps.InfoWindow({
        map: map,
        content: "Starting Content"
    });

    markerTemp.addListener('click', function() {
        infowin.close();
        infowin.setContent(contentString);
        infowin.open(map, markerTemp);
    });
}

function callback(result) {
    console.log(result);
    //console.log(result.location.length);
    console.log(result.location[0].latitude);
    for (var i = 0; i < result.location.length; i++) {
        'use strict';
        //$.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + result.location[i].city + "&key=AIzaSyCap27wvg3NHzW-3B8KpoQ_clhEzFi8Pbs", locationCallback);
        // var place = result.location[i]
        // placesArray.push({
        //     username: result.location[i].username,
        //     name: result.location[i].name,
        //     city: result.location[i].city,
        //     lat: result.location[i].latitude,
        //     lng: result.location[i].longitude
        // });
        var markerTemp = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: {
                lat: result.location[i].latitude,
                lng: result.location[i].longitude
            },
            name: result.location[i].name
        });

        var currentName = result.location[i].name;

        var contentString = '<div id="content">' +
            '<h3 id="firstHeading" class="firstHeading">' +
            '<a href = "project.handlebars">' + result.location[i].name + '</a>' + '</h3>' +
            '<div id="bodyContent">' +
            '<p>' + result.location[i].city +
            '</p>' +
            '</div>';

        //markerTemp.addListener('click', createView(contentString,markerTemp));
        markerTemp.addListener('click', toggleBounce);
        placesArray.push(markerTemp);
    }

    console.log(placesArray[3]);
}


function toggleBounce() {
    counter++;
    window.alert("Come hither!");
    //console.log("I was clicked", counter);
    //infowin = new google.maps.InfoWindow({});
    // infowin.close();
    //infowin.setContent(contentString);
    //infowin.open(map, markerTemp);
    // if (marker.getAnimation() !== null) {
    //   marker.setAnimation(null);
    // } else {
    //   marker.setAnimation(google.maps.Animation.BOUNCE);
    // }
}

//
