APP_MODULE
	.controller('TodoCtrl', [
		'$scope',
		'$state',
		'API',
		'list',
		function ($scope, $state, API, list) {

			$scope.list = list;

			$scope.addItem = function(newItem){

				if (!$scope.newItem) {
					alert('You must provide a value for new item.');
					return;
				}

				$scope.list.items.push($scope.newItem);
				$scope.newItem = '';
			}
		}
	]);