const express = require('express');
const tasksRouter = express.Router();
const TasksController = require('../controllers/tasks.controller.js');


tasksRouter.use((req, res, next) => {
	if (req.isAuthenticated()){
		return next();
	} 

	res.status(401).json({
		message: 'You are not currently logged in.'
	});

});

// Validation for body or query string

tasksRouter.use(TasksController.validateData);

tasksRouter.route('/task')
	// GET to /api/task will return tasks according to a date and type of request
	.get(TasksController.getTasks)
	// POST to /api/task will create a task 
	.post(TasksController.createTask)
	// PUT to /api/task will update a task
	.put(TasksController.updateTask)
	// DELETE to /api/task with id of task will delete a task
	.delete(TasksController.deleteTask);

module.exports = tasksRouter;