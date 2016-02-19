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
    // $.get("fbData", callback);

    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
        center: {
            lat: 32.881263,
            lng: -117.237547
        },
        disableDefaultUI: true,
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

        var  contentString = '<div id="content">' +
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
