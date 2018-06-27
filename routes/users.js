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

function getCurrentUser(req, res) {
	
	const { id, userName } = req.user;
	res.json({
		id, userName
	});

}

module.exports = function(passport) {

	userRoutes.route('/auth')
		// GET to /api/auth will return current logged in user info
		.get((req, res) => {
			if (!req.user) {
				return res.status(401).json({
					message: 'You are not currently logged in.'
				});
			}

			getCurrentUser(req, res);
		})
		// POST to /api/auth with email and password will authenticate the user
		.post(	
			passport.authenticate('local'), (req, res) => {
				if (!req.user) {
					return res.status(401).json({
						message: 'Invalid username or password.'
					});
				}

				getCurrentUser(req,res);
			}
		)
		// DELETE to /api/auth will log the user out
		.delete((req,res) => {
			req.logout();
			req.session.destroy();
			res.json({
				message: 'You have been logged out.'
			});
		});

	userRoutes.route('/users')
		// POST to /api/users will create a new user
		.post(async (req, res, next) => {
			try {
				const result = Joi.validate(req.body, userSchema);

				if (result.error) {
					return res.status(400).json({
						message: 'Data entered is not valid. Please try again.'
					});
				}

				const user = await User.findOne({'email' : result.value.email });
				if (user) {
					return res.status(400).json({
						message: 'Email is already in use.'
					});
				}

				delete result.value.confirmationPassword;

				const newUser = new User(result.value);
				const userSaved = await newUser.save();
				
				const { id, userName } = userSaved;

				res.json({
					id, userName
				});

			} catch(err) {
				return next(new Error(err));
			}
		});

	return userRoutes;
}