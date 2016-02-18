/*
 * This file contains all logic for Facebook OAuthentication
 * along with a GET request for FB user posts and respective 
 * locations. Data will be sent from client side to server side,
 * which will then be sent back to the client side for the 
 * Google Maps API to interpret. An alternative to this logic would
 * involve the use of PassportJS. OAuth logic acquired from
 * developers.facebook.com.
 */

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '757256881074429',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5' 
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';

    });
    FB.api(
        '/me',
        'GET', {
            "fields": "id,name,posts{place}"
        },
        function(response) {
            filterJson(response);
        }
    );

}

function filterJson(toBeReduced) {
    var places = {
        location: []
    };
    var name = toBeReduced.name;
    for (var i = 0; i < toBeReduced.posts.data.length; i++) {
        if (toBeReduced.posts.data[i].place != null) {
            places.location.push({
                "username": name,
                "name": toBeReduced.posts.data[i].place.name,
                "city": toBeReduced.posts.data[i].place.location.city,
                "country": toBeReduced.posts.data[i].place.location.country,
                "latitude": toBeReduced.posts.data[i].place.location.latitude,
                "longitude": toBeReduced.posts.data[i].place.location.longitude
            });

        }
    }
    postRequest(places);
}

function postRequest(object) {
    $.post("/fbData?object=" + JSON.stringify(object), function(response) {
        console.log("sending to server...")
        console.log(response);
    });
    // move to home view
    window.location.href = "/map"
}
