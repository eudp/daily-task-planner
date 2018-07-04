const express = require('express');
const tasksRouter = express.Router();
const Todo = require('../models/Todo');
const ObjectId = require('mongoose').Types.ObjectId;
const Joi = require('joi');
const { addDays, 
				subDays, 
				endOfWeek, 
				startOfWeek, 
				endOfMonth, 
				startOfMonth } = require('date-fns');

// Validation schema for Joi

const queryStringSchema = Joi.object().keys({
	type: Joi.any().valid('d', 'w', 'm').required(),
	date: Joi.date().iso().required()
});

tasksRouter.use((req, res, next) => {
	if (req.isAuthenticated()){
		return next();
	} 

	res.status(403).json({
		message: 'You are not currently logged in.'
	});

});

tasksRouter.route('/task')
	// GET to /api/task will return tasks according to a date and type of request
	.get(async (req, res, next) => {

		const result = Joi.validate(req.query, queryStringSchema);

		if (result.error) {
			return res.status(400).json({
				message: 'URL request is not valid.'
			});
		}

		let startDate;
		let endDate;

		switch(req.query.type) {
			case 'd':
				startDate = subDays(req.query.date, 2);
				endDate = addDays(req.query.date, 2);
				break;
			case 'w':
				startDate = startOfWeek(req.query.date, {weekStartsOn: 1});
				endDate = endOfWeek(req.query.date, {weekStartsOn: 1});
				break;
			case 'm':
				startDate = startOfMonth(req.query.date);
				endDate = endOfMonth(req.query.date);
		}

		try {

			const tasks = await Todo.aggregate([
				{	"$match": {
						"date": {
							"$gte": startDate,
							"$lte": endDate
						}
					}
				},
				{	"$project": { 
						"date": true,
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
					//format date is ISO 
					date: new Date(req.body.date)
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
					date: new Date(req.body.date),
					"tasks._id": req.body.id,
					"tasks.idUser": req.user._id
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
					date: new Date(req.body.date)
				},
				{
					"$pull": {
						tasks: {
							_id: req.body.id,
							idUser: req.user._id
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