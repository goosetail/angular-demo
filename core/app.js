"use strict";
var pkg = require('../package.json');
var express = require('express');
var path = require('path');
var async = require('async');
var logger = require('morgan');
var nconf = require('nconf');
var mongoose = require('mongoose');
var assetWorker = require('asset-worker');
var mongooseConnect = require('./lib/mongooseConnect');
var utils = require('./lib/utils');
var rpc = require('./lib/rpc');
var fling = require('fling');
var models = require('./models');
var favicon = require('serve-favicon');

var app = module.exports = express();

// load config
nconf.file('default', __dirname + '/config/default.json');

nconf.set('appName', pkg.name);

// init assets
var buildDir = path.join(__dirname, '.build');
var clientDir = path.join(__dirname, 'client');

assetWorker.setOptions({
	clientDir: clientDir,
	buildDir: buildDir,
	resourceRoot: nconf.get( 'app:resourceRoot' ),
	optimized: nconf.get( 'app:optimized' ),
	appVersion: pkg.version
});

// set app variables
app.set('host', utils.createHost());
app.set('clientDir', clientDir);
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/client/app/lib/images/favicon.png'));

// setup
var tasks = {

	// initialize all the data models
	initDatabase: function(next) {
		mongooseConnect.connect(nconf.get('database:url'), function(err) {

			if (err) {
				return next(err);
			}

			// instantiate  models
			models.init(mongoose.connection);
			setImmediate(next);
		});
	},

	// initialize the API
	initAPI: function(next) {

		// This creates all the express middleware necessary for the API, also API docs are created here.
		rpc.initMiddleware(app, next);
	},

	// initialize Fling which is the RPC client
	initFling: function(next) {

		var receiver = fling.createReceiver({
			transports: {
				Express: {
					app: app,
					url: '/rpc',
					authenticate: function(request, done) {
						done(request.session.agent || null);
					}
				}
			},
			baseDir: path.join(__dirname, '/lib/rpc/lib')
		});

		receiver.init(next);

	},

	// all the standard middleware for the app and routes
	setRoutesAndMiddleware: function(next) {

		// development only
		if (app.get('env') === 'development') {
			// pretty html
			app.locals.pretty = true;

			app.use(logger('dev'));
		}

		// handing static assets
		app.use(express.static(buildDir));

		// only expose client directory if in development or debugging
		app.use( function( req, res, next ) {

			if (req.query['__scriptdebug__'] === 'true') {
				req.__debugFlag = true;
			}

			if (app.get('env') === 'development' || req.__debugFlag) {
				express.static(clientDir).apply(this, arguments);
			}
			else {
				next();
			}
		});

		// define the routes for the application
		app.use('/', require( './routes'));

		// define the routes for the error pages
		require('./routes/error')(app);

		setImmediate(next);
	}
};

// run all the tasks to start the server
async.series(tasks, function(err) {
	if (err) {
		console.error(err)
	}
});