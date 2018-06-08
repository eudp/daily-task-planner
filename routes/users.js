'use strict';

var express = require('express');
var userRoutes = express.Router();
var Joi  = require('joi');
var User = require('../models/User');

// Validation schema for Joi

const userSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	userName: Joi.string().required(),
	password: Joi.string().regex(/^[a-zA-z0-9]{6,30}$/).required(),
	confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

module.exports = function(passport) {

	userRoutes.route('/login')
		.post(
			passport.authenticate('local', 
				{
					successRedirect: '',
					failureRedirect: '',
					failureFlash: true
				}
			)
		);

	userRoutes.route('/logout')
		.post((req, res) => {
			req.logout();
			req.session.destroy();
			res.redirect('');
		});

	userRoutes.route('/register')
		.get((req,res) => {
			//res.render('register');
		})
		.post(async (req,res,next) => {
			try {
				const result = Joi.validate(req.body, userSchema);

				if (result.error) {
					req.flash('error', 'Data entered is not valid. Please try again.');
					res.redirect('/users/register');
					return;
				}

				const user = await User.findOne({'email' : result.value.email });
				if (user) {
					req.flash('error', 'Email is already in use');
					res.redirect('/users/register');
					return;
				}

				delete result.value.confirmationPassword;

				const newUser = await new User(result.value);
				await newUser.save();

				req.flash('success', 'Registration sucessfully, go ahead and login.');
				res.redirect('/users/login');
			} catch(error) {
				next(error);
			}
		});

	return userRoutes;
}