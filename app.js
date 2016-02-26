/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
    //var jsonpack = require('jsonpack/main');
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

// Route definitions
var data = require('./data.json');
var oldData = require('./oldData.json');
var mapjson = require('./routes/mapjson');
var index = require('./routes/index');
var project = require('./routes/project');
var login = require('./routes/login');
var homepage = require('./routes/homepage');
var homepage2 = require('./routes/homepage2');
var findExplorers = require('./routes/findExplorers');
var surprise = require('./routes/surprise');
var list = require('./routes/list');
var fbData = require('./routes/fbData');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());

app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new FacebookStrategy({
        clientID: '757256881074429',
        clientSecret: 'e39d2ca6d80a8f96adad120bacdb20af',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id',
            'displayName',
            'picture.type(large)',
            'posts.limit(100){message,place,picture,created_time}'
        ]
    },
    function(accessToken, refreshToken, profile, done) {

        var username = profile._json.name;
        var profilePicture = profile._json.picture.data.url;
        var message, picture = '';
        var latitude, longitude = 0;

        for (var i = 0; i < profile._json.posts.data.length; i++) {
            if (profile._json.posts.data[i].place != null) {
                // console.log("message: " + profile._json.posts.data[i].message);
                // console.log("name: " + profile._json.posts.data[i].place.name);
                // console.log("latitude: " + profile._json.posts.data[i].place.location.latitude);
                // console.log("longitude: " + profile._json.posts.data[i].place.location.longitude);
                // console.log("city: " + profile._json.posts.data[i].place.location.city);
                // console.log("===============================================================");

                data["location"].push({
                    "username": username,
                    "profilePicture": profilePicture,
                    "message": profile._json.posts.data[i].message,
                    "picture": profile._json.posts.data[i].picture,
                    "name": profile._json.posts.data[i].place.name,
                    "latitude": profile._json.posts.data[i].place.location.latitude,
                    "longitude": profile._json.posts.data[i].place.location.longitude,
                    "city": profile._json.posts.data[i].place.location.city
                });
            }
        }
        return done(null, profile);
    }
));

// for facebook auth purposes
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.view);
app.get('/map', homepage.view);
// app.get('/map2', homepage.viewAlt);
app.get('/map2', homepage2.view);
app.get('/findExplorers', list.view);
app.get('/surprise', surprise.view);
app.get('/list', list.view);
app.get('/mapjson', mapjson.view);


// facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/map',
        failureRedirect: '/'
    }));

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
