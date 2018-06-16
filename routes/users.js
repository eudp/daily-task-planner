const express = require('express');
const userRoutes = express.Router();
const Joi  = require('joi');
const User = require('../models/User');

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
					successRedirect: '/',
					failureRedirect: '/',
					failureFlash: true
				}
			)
		);

	userRoutes.route('/logout')
		.get((req, res, next) => {
			req.logout();
			req.session.destroy();
			res.redirect('/');
		});

	userRoutes.route('/register')
		.get((req, res, next) => {
			if (!req.user) {
				res.render('register', {flash: req.flash()});
			} else {
				res.redirect('/');
			}
		})
		.post(async (req, res, next) => {
			try {
				const result = Joi.validate(req.body, userSchema);

				if (result.error) {
					req.flash('error', 'Data entered is not valid. Please try again.');
					res.render('register', {flash: req.flash()});
					return;
				}

				const user = await User.findOne({'email' : result.value.email });
				if (user) {
					req.flash('error', 'Email is already in use');
					res.render('register', {flash: req.flash()});
					return;
				}

				delete result.value.confirmationPassword;

				const newUser = new User(result.value);
				await newUser.save();

				req.flash('success', 'Registration sucessfully now please log in.');
				res.redirect('/');
			} catch(err) {
				return next(new Error(err));
			}
		});

	return userRoutes;
}