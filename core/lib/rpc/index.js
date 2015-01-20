var nconf = require('nconf');
var mongoose = require('mongoose');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var arpisea = require('arpisea');

module.exports = {
	initMiddleware: initMiddleware
};

function initMiddleware(app, done) {

	var MongoStore = require('connect-mongo')(session);

	// API middleware
	app.use('/rpc', bodyParser.json());
	app.use('/rpc', bodyParser.urlencoded());
	app.use('/rpc', cookieParser());
	app.use('/rpc', session({
		name: 'groups.api.sid',
		secret: nconf.get('app:sessionSecret'),
		rolling: true,
		saveUninitialized: true,
		resave: true,
		cookie: {
			maxAge: 86400000 * 14, // 2 weeks
			path: '/rpc'
		},
		store: new MongoStore({
			mongoose_connection: mongoose.connection
		})
	}));

	// initialize the RPC docs

	var client = arpisea.createClient({
		libDir: path.join(__dirname, '/lib'),
		docFile: path.join(__dirname, 'rpc.json'),
		url: '/rpc',
		server: app
	});

	client.init(done);

}