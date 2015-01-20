var APP_MODULE = angular.module('angular-demo', [
	'ui.router',
	'templates-app',
	'angular-util',
	'ui.bootstrap'
	])

	.constant('Config', {
		debug: true
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