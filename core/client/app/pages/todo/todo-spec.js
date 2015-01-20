describe('TodoCtrl', function() {
	beforeEach(module('angular-demo'));

	var $scope;
	var $ctrl;

	var list = {
		name: 'To-Do List',
		items:[{
			id: 1,
			task: 'First Task'
		}]
	};

	beforeEach(inject(function(_$controller_){
		$scope = {};
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$ctrl = _$controller_('TodoCtrl', { $scope: $scope, list: list });

	}));

	describe('.addItem()', function () {
		it('should add a new item to the list', function(){

			$scope.list = list;

			var newItem = {task: 'Second Task'};

			$scope.addItem(newItem);

			expect($scope.list.items.length).to.equal(2);
		})
	});

});