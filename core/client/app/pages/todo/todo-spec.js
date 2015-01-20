describe('TodoCtrl', function() {
	beforeEach(module('angular-demo'));

	var $controller;
	var list = {
		name: 'To-Do List',
		items:[{
			id: 1,
			task: 'First Task'
		}]
	};

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('.addItem()', function () {
		it('should add a new item to the list', function(){

			var $scope = {};
			$controller('TodoCtrl', { $scope: $scope, list: list });

			$scope.list = list;

			var newItem = {task: 'Second Task'};

			$scope.addItem(newItem);

			expect($scope.list.items.length).to.equal(2);
		})
	});


});