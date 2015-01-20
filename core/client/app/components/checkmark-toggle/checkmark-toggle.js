APP_MODULE
	.directive('checkmarkToggle', function () {
		return {
			transclude: true,
			scope: { },
			templateUrl: "/app/components/checkmark-toggle/checkmark-toggle.html",
			link: function(scope, elem, attrs) {

				scope.toggle = function(){
					scope.toggled = !scope.toggled
				}
			}
		}
	});