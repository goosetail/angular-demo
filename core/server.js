"use strict";

var app = require('./app');
var cluster = require('cluster');
var nconf = require('nconf').env();
var numCPUs = nconf.get('server:setWorkers') || require('os').cpus().length;

if (cluster.isMaster) {

	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker %d died (%s)', worker.process.pid, signal || code);
		cluster.fork();
	});

	cluster.on('listening', function(worker) {
		console.log('Worker ' + worker.process.pid + ' --> ' + app.get('host'));
	});
}
else {
    var appName = nconf.get('appName');

	app.listen(nconf.get('server:port'), function() {

		// for production we want to switch to dummy user
		if ('development' !== app.get('env')) {
			process.setgid(appName);
			process.setuid(appName);
		}
	});
}

