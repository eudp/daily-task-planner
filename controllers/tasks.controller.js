const ObjectId = require('mongoose').Types.ObjectId; 
const TasksService = require('../services/tasks.service.js');
const { addDays, 
				endOfWeek, 
				startOfWeek, 
				endOfMonth, 
				startOfMonth } = require('date-fns');
const Joi = require('joi');


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

// Validation for body or query string

exports.validateData = (req, res, next) => {

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

}

exports.getTasks = async (req, res, next) => {

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

		const tasks = await TasksService.getTasks(req.user, startDate, endDate);

		res.json(tasks);
		
	} catch (err) {
		return next(new Error(err));
	}

}

exports.createTask = async (req, res, next) => {

	try {

		const subdoc = {
			_id: ObjectId(),
			text: req.body.text,
			done: false,
			date: new Date(req.body.date)
		};

		const doc = await TasksService.createTask(req.user, subdoc);

		res.status(201).json({
			_id: subdoc._id,
			text: subdoc.text,
			done: subdoc.done,
			date: subdoc.date
		});

	} catch (err) {
		return next(new Error(err));
	}

}

exports.updateTask = async (req, res, next) => {

	try {

		const tasks = await TasksService.updateTask(req.user, req.body);

		res.json({
			_id: req.body.id,
			text: req.body.text,
			done: req.body.done,
			date: new Date(req.body.date)
		});
		
	} catch (err) {
		return next(new Error(err));
	}

}

exports.deleteTask = async (req, res, next) => {

	try {

		const tasks = await TasksService.deleteTask(req.user, req.query);

		res.json({
			message: 'Succesfully removed'
		});

	} catch (err) {
		return next(new Error(err));
	}

}