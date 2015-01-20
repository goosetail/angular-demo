
module.exports = {
	getList: getList
};

function getList(request, response) {

	// In a normal application, this would be a call to some data store
	var list = generateList();
	response.send(list);

}

function generateList() {
	var list = {
		name: 'To-Do List',
		items: [
			{
				id: 1,
				task: 'Wash the car.'
			},
			{
				id: 2,
				task: 'Eat Dinner.'
			},
			{
				id: 3,
				task: 'Write some code.'
			}
		]
	};

	return list;
}