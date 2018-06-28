const mongoose = require('mongoose');

const Task = new mongoose.Schema({
	idUser: mongoose.Schema.Types.ObjectId,
	text: String,
	note: String,
	done: Boolean
});

const Todo = new mongoose.Schema({
	date: Number,
	tasks:[Task]
},

	{
		collection: 'todo'
	}
	
);

module.exports = mongoose.model('Todo', Todo);