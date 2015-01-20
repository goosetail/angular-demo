describe('todoItem', function() {
	var $compile;
	var $scope;
	var elem;

	beforeEach(module('angular-demo')); //load our app
	beforeEach(module('templates'));  //load our templates

	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$scope = _$rootScope_.$new();
		elem = $compile('<div todo-item item="item"></div>')($scope);  //compile the template
	}));

	it('should display the todo-item task', function() {

		$scope.item = {
			id: 1,
			task: 'My task to do.'
		};

		elem.scope().$apply();

		expect(elem[0].innerHTML).to.contain('My task to do.');
	});
});