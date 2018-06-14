var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');
var ObjectId = require('mongoose').Types.ObjectId; 

router.get('/', function(req, res, next) {
	if (!req.user) {
 		res.render('login', {flash: req.flash()});
 	} else {
 		res.render('index', {user: req.user})
 	}
});

router.get('/add', function(req, res, next) {
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
