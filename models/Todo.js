var mongoose = require('mongoose');

var task = new mongoose.Schema({
	text: String,
	done: Boolean,
	idUser: mongoose.Schema.Types.ObjectId
});

var todo = new mongoose.Schema({

	date: Number,
	tasks: [task]
},

	{
		collection: 'todos'
	}
);

module.exports = mongoose.model('Todo', todo);