const mongoose = require('mongoose');

const Task = new mongoose.Schema({
	date: Date,
	text: String,
	done: Boolean
});

const Todo = new mongoose.Schema({
	idUser: mongoose.Schema.Types.ObjectId,
	tasks:[Task]
},

	{
		collection: 'todo'
	}
	
);

module.exports = mongoose.model('Todo', Todo);