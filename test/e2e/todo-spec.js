describe('To-Do list page', function() {
	it('should add one and two', function() {
		browser.get('http://localhost:3000/todo');

		element.all(by.repeater('item in list.items')).then(function(items) {
			var firstToDo = items[0];

			firstToDo.click();

			var count = firstToDo.all(by.css('i.fa-check-square-o')).count();

			expect(count).toEqual(1);
		});

	});
});