APP_MODULE
	.directive('todoItem', function () {
		return {
			scope: {
				item: '='
			},
			templateUrl: "/app/components/todo-item/todo-item.html",
			link: function(scope, elem, attrs) {

			}
		}
	});