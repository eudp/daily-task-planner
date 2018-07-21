const express = require('express');
const tasksRouter = express.Router();
const ObjectId = require('mongoose').Types.ObjectId; 
const Todo = require('../models/Todo');
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

const bodySchema = Joi.object().keys({
	date: Joi.date().iso().required(),
	text: Joi.string().max(100),
	done: Joi.boolean(),
	id: Joi.any()
});

const deleteSchema = Joi.object().keys({
	id: Joi.any().required()
});

tasksRouter.use((req, res, next) => {
	if (req.isAuthenticated()){
		return next();
	} 

	res.status(403).json({
		message: 'You are not currently logged in.'
	});

});

// Validation for body or query string

tasksRouter.use((req, res, next) => {

	let reqContent, schema;

	if (req.method === 'GET') {
		reqContent = req.query;
		schema = queryStringSchema;
	} else if (req.method === 'DELETE') {
		reqContent = req.query;
		schema = deleteSchema;
	} else {
		reqContent = req.body;
		schema = bodySchema;
	}

	const result = Joi.validate(reqContent, schema);

	if (!result.error) {
		return next();
	}

	res.status(400).json({
		message: 'URL request is not valid.'
	});

});

tasksRouter.route('/task')
	// GET to /api/task will return tasks according to a date and type of request
	.get(async (req, res, next) => {

		let startDate;
		let endDate;

		switch(req.query.type) {
			case 'd':
				startDate = new Date(req.query.date);
				endDate = addDays(req.query.date, 3);
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
						"idUser": req.user._id
					}
				},
				{	"$project": { 
						"tasks": { 
							"$filter": { 
								"input": "$tasks",  
                "as": "task",
								"cond":
									{ "$and": [
						        { "$gte": [ "$$task.date", startDate ] },
						        { "$lte": [ "$$task.date", endDate ] }
						      ] }
							} 
						} 
					}
				},
				{ "$unwind": "$tasks" },
				{ "$group" : { 
						_id : "$tasks.date", 
						tasks: { "$push": 
									{ 
										_id: "$tasks._id",
										text: "$tasks.text",
										done: "$tasks.done" 
									}
						} 
					}
				},
				{ "$sort": { _id: 1} }
			]).exec();

			res.json(tasks);
			
		} catch (err) {
			return next(new Error(err));
		}

	})
	// POST to /api/task will create a task 
	.post(async (req, res, next) => {

		try {

			const subdoc = {
				_id: ObjectId(),
				text: req.body.text,
				done: false,
				date: new Date(req.body.date)
			};

			const doc = await Todo.findOneAndUpdate(
				{
					idUser: req.user._id
				},
				{
					idUser: req.user._id,
					"$push": { 
            tasks: subdoc
          } 
				},
				{
					upsert: true
				}
			).exec();

			res.status(201).json({
				_id: subdoc._id,
				text: subdoc.text,
				done: subdoc.done,
				date: subdoc.date
			});

		} catch (err) {
			return next(new Error(err));
		}

	})
	// PUT to /api/task will update a task
	.put(async (req, res, next) => {

		try {

			const tasks = await Todo.findOneAndUpdate(
				{
					"tasks._id": req.body.id,
					"idUser": req.user._id
				},
				{
					"$set" : {
						"tasks.$.text" : req.body.text,
						"tasks.$.done" : req.body.done
					}
				}
			).exec();

			res.json({
				_id: req.body.id,
				text: req.body.text,
				done: req.body.done,
				date: new Date(req.body.date)
			});
			
		} catch (err) {
			return next(new Error(err));
		}
	})
	// DELETE to /api/task with id of task will delete a task
	.delete(async (req, res, next) => {

		try {

			const tasks = await Todo.findOneAndUpdate(
				{
					"idUser": req.user._id
				},
				{
					"$pull": {
						tasks: {
							"_id": req.query.id,
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