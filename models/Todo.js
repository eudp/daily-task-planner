var mongoose = require('mongoose');

var Task = new mongoose.Schema({
	idUser: mongoose.Schema.Types.ObjectId,
	text: String,
	note: String,
	done: Boolean
});

var Todo = new mongoose.Schema({
	date: Number,
	tasks:[Task]
},

	{
		collection: 'todos'
	}
	
);

module.exports = mongoose.model('Todo', Todo);