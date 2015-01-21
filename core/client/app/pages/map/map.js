APP_MODULE
	.controller('MapCtrl', [
		'$scope',
		'$state',
		'API',
		function ($scope, $state, API) {

			$scope.map = {
				center: {
					latitude: 39.7965279,
					longitude: -104.9951871
				},
				zoom: 10
			};
		}
	]);