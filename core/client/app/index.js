var APP_MODULE = angular.module('angular-demo', [
	'ui.router',
	'templates-app',
	'angular-util',
	'ui.bootstrap',
	'uiGmapgoogle-maps'
	])

	.constant('Config', {
		debug: true
	})
	.config(function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyA9X85xeouFCSM6FA3I3YWJUkVmZ2jmjWc',
			v: '3.17',
			libraries: 'weather,geometry,visualization'
		});
	})
	.run([
		'$rootScope',
		'Util',
		function($rootScope, Util){

			// handle global events.
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

			});

			$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error){
				Util.handleError(error)
			});

		}
	]);