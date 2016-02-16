/*
 * Google Maps to be used in the home screen
 */

var map;
var infoWindow;
var eventsArray = [];
var currentEvent = 0;

function initMap() {
    'use strict';
    //$.get("/jsonevents", callback);

    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
        center: {
            lat: 32.881263,
            lng: -117.237547
        },
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow({
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

//AIzaSyDxQHxqVPfhfz5wbVGsvj2ajlmplggd-VE
