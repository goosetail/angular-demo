var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var arpisea = require('arpisea');

module.exports = {
	initMiddleware: initMiddleware
};

function initMiddleware(app, done) {

	// API middleware
	app.use('/rpc', bodyParser.json());
	app.use('/rpc', bodyParser.urlencoded());
	app.use('/rpc', cookieParser());

	// initialize the RPC docs

	var client = arpisea.createClient({
		libDir: path.join(__dirname, '/lib'),
		docFile: path.join(__dirname, 'rpc.json'),
		url: '/rpc',
		server: app
	});

	client.init(done);

}