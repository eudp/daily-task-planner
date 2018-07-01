const express = require('express');
const tasksRouter = express.Router();
const Todo = require('../models/Todo');
const ObjectId = require('mongoose').Types.ObjectId; 

tasksRouter.use((req, res, next) => {
	if (req.isAuthenticated()){
		return next();
	} 

	res.status(403).json({
		message: 'You are not currently logged in.'
	});

});

tasksRouter.route('/task')
	// GET to /api/task will return tasks
	.get(async (req, res, next) => {

		try {

			const tasks = await Todo.aggregate([
				{ "$project": { 
						"date": "$date",
						"tasks": { 
							"$filter": { 
								"input": "$tasks", 
								"as": "task", 
								"cond": { "$setIsSubset": [ [ "$$task.idUser" ], 
								[ new ObjectId(req.user._id)] ] }
							} 
						} 
					}
				}
			]).exec();

			res.json(tasks);
			
		} catch (err) {
			return next(new Error(err));
		}

	})
	// POST to /api/task will create a task 
	.post(async (req, res, next) => {

		try {

			const tasks = await Todo.findOneAndUpdate(
				{
					//format date is month/day/year
					date: Math.floor(new Date(req.body.date).getTime() / 1000)
				},
				{
					"$push": {
						tasks: {
							text: req.body.text,
							done: false,
							idUser: req.user._id
						}
					}
				},
				{
					upsert: true,
					new: true
				}
			).exec();

			res.json(tasks);

		} catch (err) {
			return next(new Error(err));
		}

	})
	// PUT to /api/task with id of task will update a task
	.put(async (req, res, next) => {

		try {

			const tasks = await Todo.findOneAndUpdate(
				{
					date: Math.floor(new Date(req.body.date).getTime() / 1000),
					"tasks._id": req.body.id
				},
				{
					"$set" : {
						"tasks.$.text" : req.body.text,
						"tasks.$.done" : req.body.done
					}
				},
				{
					new: true
				}
			).exec();

			res.json(tasks);
			
		} catch (err) {
			return next(new Error(err));
		}
	})
	// DELETE to /api/task with id of task will delete a task
	.delete(async (req, res, next) => {

		try {

			const tasks = await Todo.findOneAndUpdate(
				{
					date: Math.floor(new Date(req.body.date).getTime() / 1000)
				},
				{
					"$pull": {
						tasks: {
							_id: req.body.id,
						}
					}
				}
			).exec();

			res.json({
				message: 'Succesfully removed'
			});

		} catch (err) {
			return next(new Error(err));
		}

	});

module.exports = tasksRouter;