describe('To-Do list page', function() {
	it('should toggle the checkmark icon', function() {
		browser.get('http://localhost:3000/todo');

		element.all(by.repeater('item in list.items')).then(function(items) {
			var firstToDo = items[0];

			firstToDo.click();

			var count = firstToDo.all(by.css('i.fa-check-square-o')).count();

			expect(count).toEqual(1);
		});

	});

	it('should add an item to the list', function() {
		browser.get('http://localhost:3000/todo');

		var count = 0;

		element.all(by.repeater('item in list.items')).then(function(items) {
			count = items.length;

			$('.add-item input').sendKeys('Another To-Do Item!');

			$('.add-item button').click();

			expect(element.all(by.className('todo-item')).count()).toEqual(count +1);

		});

	});
});