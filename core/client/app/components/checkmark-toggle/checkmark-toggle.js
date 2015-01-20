APP_MODULE
	.directive('checkmarkToggle', function () {
		return {
			transclude: true,
			controller: 'CheckmarkToggleCtrl',
			scope: {
				toggled: '='
			},
			templateUrl: "/app/components/checkmark-toggle/checkmark-toggle.html",
			link: function (scope, elem, attrs) {


			}
		}
	})
	.controller('CheckmarkToggleCtrl', [
	    '$scope',
	    function ($scope) {
		    $scope.toggle = function () {
			    $scope.toggled = !$scope.toggled;
		    }
	    }
	]);