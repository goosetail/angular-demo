APP_MODULE
	.controller('TodoCtrl', [
		'$scope',
		'$state',
		'API',
		'list',
		function ($scope, $state, API, list) {

			$scope.list = list;

			$scope.addItem = function(newItem){
				if(!newItem) { return; }

				$scope.list.items.push(newItem);

				$scope.newItem = null;
			}
		}
	]);