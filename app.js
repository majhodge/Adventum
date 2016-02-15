
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')


// Example route
// var user = require('./routes/user');
var index = require('./routes/index');
var project = require('./routes/project');
var login = require('./routes/login');
var homepage =  require('./routes/homepage');
var findExplorers =  require('./routes/findExplorers');
var surprise = require('./routes/surprise');

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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.view);
app.get('/map', homepage.view);
app.get('/findExplorers', findExplorers.view);
app.get('/surprise', surprise.view);


//app.get('/index', index.view);
//app.get('/project/:name', project.viewProject);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});