/*
 * Google Maps to be used in the home screen
 */

var map;
var infoWindow;
var placesArray = [];
var currentPlace = 0;

function initMap() {
    'use strict';
    $.get("/mapjson", callback);

    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
        center: {
            lat: 32.881263,
            lng: -117.237547
        },
        zoom: 12
    });

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

    createEventMarker(map, infoWindow, place.name, place.type, place.lat, place.lng);
}

function createEventMarker(map, infoWindow, name, type, lat, lng) {

    var lattitude = parseFloat(lat);
    var longitude = parseFloat(lng);

    console.log(lattitude);
    console.log(longitude);

    var markerTemp = new google.maps.Marker({
        map: map,
        position: {
            lat: lattitude,
            lng: longitude
        },
        name: name
    });

    /*google.maps.event.addListener(markerTemp, 'click', function() {
        infoWindow.setContent('<div><strong>' + title + '</strong><br>' +
        date1 + " at " + hrs1 + ":" + minute1 + ampm1 + '<br>' +
        price + '</div>' + '<a href="/view"><input type="submit" value="View"></a>');
        infoWindow.open(map, this);
    });*/
}

function callback(result) {
    for (var i = 0; i < result.places.length; i++) {
        'use strict';
        $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + result.places[i].location + "&key=AIzaSyDxQHxqVPfhfz5wbVGsvj2ajlmplggd-VE", locationCallback);
        var place = result.places[i]
            //var event = result.events[i];
        placesArray.push({
            name: place.name,
            type: place.type,
            lat: place.lat,
            lng: place.lng

            //
            // title: event.title,
            // date1: event.date1,
            // hrs1: event.hrs1,
            // minute1: event.minute1,
            // ampm1: event.ampm1,
            // price: event.price
        });
    }
}

//
