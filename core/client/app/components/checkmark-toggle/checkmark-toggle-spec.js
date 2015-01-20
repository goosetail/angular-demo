describe('checkmarkToggle', function() {
	var $compile;
	var $scope;
	var elem;

	beforeEach(module('angular-demo')); //load our app
	beforeEach(module('templates'));  //load our templates

	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$scope = _$rootScope_.$new();
	}));

	it('should show a check mark if an item has been toggled', function() {

		elem = $compile('<div checkmark-toggle toggled="true"></div>')($scope);  //compile the template

		$scope.$digest();

		// check for the 'checked' icon
		expect(elem[0].innerHTML).to.contain('fa-check-square-o');
	});

	it('should show an empty square if an item has not been toggled', function() {

		elem = $compile('<div checkmark-toggle toggled="false"></div>')($scope);  //compile the template

		$scope.$digest();

		// check for the 'checked' icon
		expect(elem[0].innerHTML).to.contain('fa-square-o');
	});
});

describe('CheckmarkToggleCtrl', function() {
	beforeEach(module('angular-demo'));

	var $scope;
	var $ctrl;

	beforeEach(inject(function(_$controller_){
		$scope = {};
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$ctrl = _$controller_('CheckmarkToggleCtrl', { $scope: $scope});

	}));

	describe('.toggle()', function () {
		it('$scope.toggle() should change the value of $scope.toggled', function(){

			$scope.togled = false;

			$scope.toggle();

			expect($scope.toggled).to.equal(true);
		})
	});

});