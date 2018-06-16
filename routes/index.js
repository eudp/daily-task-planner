const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const ObjectId = require('mongoose').Types.ObjectId; 

router.get('/', (req, res, next) => {
	if (!req.user) {
 		res.render('login', {flash: req.flash()});
 	} else {
 		res.render('index', {user: req.user})
 	}
});

router.get('/add', (req, res, next) => {
	if (!req.user) {
 		res.redirect('/');
 	} else {
 		res.render('add');
 	}
});

router.get('/list', async (req, res, next) => {
	if (!req.user) {
 		res.redirect('/');
 	} else {

 		try {

			const todos = await Todo.aggregate([
				{ "$project": { 
					"tasks": { 
						"$filter": { 
							"input": "$tasks", 
							"as": "task", 
							"cond": { "$setIsSubset": [ [ "$$task.idUser" ], 
							[ new ObjectId(req.user._id)] ] }
						} 
					} 
				}}
			]).exec();

				
			res.render('list', {todos});
			

		} catch (err) {
			return next(new Error(err));
		}
 	}
});

module.exports = router;
