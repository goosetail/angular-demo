"use strict";

var assets = require('asset-worker');

module.exports = function(app) {

	// ----- ERROR ----- //

	// Handle 404
	app.use(function(req, res, next) {

		assets.getPaths('error', req, function(err, paths) {

			if (err) {
				return next(err);
			}

			res.status(400);
			res.render('error/404.jade', {
				title: '404: Page Not Found',
				paths: paths
			});

		});
	});

// Handle 500
	app.use(function(err, req, res) {
		res.status(500);
		res.render('error/500.jade', {
			title: '500: Internal Server Error',
			error: 'development' === app.get('env') ? err : {}
		});
	});

};