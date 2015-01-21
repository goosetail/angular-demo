APP_MODULE
	.config([
		'$locationProvider',
		'$stateProvider',
		function($locationProvider, $stateProvider) {

			$locationProvider.html5Mode(true);

			$stateProvider
				.state('index', {
					url: '/',
					templateUrl: '/app/pages/index/index.html',
					controller: 'IndexCtrl'
				})
				.state('todo', {
					url: '/todo',
					templateUrl: '/app/pages/todo/todo.html',
					controller: 'TodoCtrl',
					resolve: {
						list: ['API', function(API) {
							return API.getTodoList();
						}]
					}
				})
				.state('map', {
					url: '/map',
					templateUrl: '/app/pages/map/map.html',
					controller: 'MapCtrl'
				});
		}
	]);