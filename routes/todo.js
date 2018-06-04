'use strict';

var express = require('express');
var todoRoutes = express.Router();
var Todo = require('../models/Todo');

todoRoutes.route('/all').get(function (req, res, next) {

	Todo.find(function (err, todos) {
		if (err) {
			return next(new Error(err));
		}

		res.json(todos);
	});
});

todoRoutes.route('/add').post(function (req, res) {

	Todo.findOneAndUpdate(
		{
			//format date is month/day/year
			date: Math.floor(new Date(req.body.date).getTime() / 1000)
		},
		{
			date: Math.floor(new Date(req.body.date).getTime() / 1000),
			"$push": {
				tasks: {
					text: req.body.text,
					done: false
				}
			}
		},
		{
			upsert: true,
			new: true
		},
		function (error, todo) {
			if (error) {
				res.status(400).send('Unable to create todo');
			}
			res.status(200).json(todo);
		}
	);
});

todoRoutes.route('/delete').post(function (req, res, next) {

	Todo.findOneAndUpdate(
		{
			//format date is month/day/year
			date: Math.floor(new Date(req.body.date).getTime() / 1000)
		},
		{
			"$pull": {
				tasks: {
					_id: req.body.id,
				}
			}
		},
		function (error, todo) {
			if (error) {
				return next(new Error('Todo was not found'));
			}
			res.json('Succesfully removed');
		}
	);
});

todoRoutes.route('/update').post(function (req, res, next) {

	Todo.findOneAndUpdate(
		{
			//format date is month/day/year
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
		},
		function (error, todo) {
			if (error) {
				res.status(400).send('Unable to update todo');
			}
			res.status(200).json(todo);
		}
	);
});

module.exports = todoRoutes;