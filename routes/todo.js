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

	Todo.create(
		{
			name: req.body.name,
			done: false
		},
		function (error, todo) {
			if (error) {
				res.status(400).send('Unable to create todo list');
			}
			res.status(200).json(todo);
		}
	);
});

todoRoutes.route('/delete/:id').get(function (req, res, next) {
	var id = req.params.id;

	Todo.findByIdAndRemove(id, function (err, todo) {
		if (err) {
			return next(new Error('Todo was not found'));
		}

		res.json('Succesfully removed');
	});
});

todoRoutes.route('/update/:id').post(function (req, res, next) {
	var id = req.params.id;

	Todo.findByID(id, function (error, todo) {
		if (error) {
			return next(new Error('Todo was not found'));
		} else {
			todo.name = req.body.name;
			todo.done = req.body.done;

			todo.save(
				function (error, todo){
				
					if (error) {
						res.status(400).send('Unable to update todo');
					} else {
						res.status(200).json(todo);
					}
				}
			);
		}
	});
});

module.exports = todoRoutes;