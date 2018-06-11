var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');
var ObjectId = require('mongoose').Types.ObjectId; 

router.get('/', function(req, res, next) {
	if (!req.user) {
 		res.redirect('/login');
 	} else {
 		res.render('index', {user: req.user})
 	}
});

router.get('/add', function(req, res, next) {
	if (!req.user) {
 		res.redirect('/login');
 	} else {
 		res.render('add');
 	}
});

router.get('/list', function(req, res, next) {
	if (!req.user) {
 		res.redirect('/login');
 	} else {

		Todo.aggregate([
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
		]).exec(
			function (err, todos) {
				if (err) {
					return next(new Error(err));
				}
				
				res.render('list', {todos});
			}
		);
 		
 	}
});

module.exports = router;
