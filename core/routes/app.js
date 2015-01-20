"use strict";

var _ = require('underscore');
var basicAuth = require('basic-auth-connect');
var app = require('../app');
var assetWorker = require('asset-worker');

// ----- ROUTE FUNCTIONS ----- //

function appAction(req, res, next) {

	assetWorker.getPaths('app', req, function(err, paths) {

		if (err) {
			return next(err);
		}

		res.render('pages/app', {
			title: 'AngularJS Demo by Goosetail Labs',
			paths: paths,
			user: req.user || {}
		});

	});

}

module.exports = function(router) {

	// ----- MAIN ROUTES ----- //

	var appRoutes = [
		'/',
		'/todo'
	];

	_.each(appRoutes, function(route) {
		router.get(route, appAction);
	});


	// ----- ADMIN ROUTES ----- //

	// placeholder for admin authentication
	var auth = basicAuth('GoosetailLabs', 'ApplicationFramework');

	var adminRoutes = [
		'/admin/',
		'/admin/users'
	];

	_.each(adminRoutes, function(route) {
		router.get(route, auth, appAction);
	});

};