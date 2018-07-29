const express = require('express');
const userRouter = express.Router();
const UsersController = require('../controllers/users.controller.js');

module.exports = function(passport) {

	userRouter.route('/auth')
		// GET to /api/auth will return current logged in user info
		.get(UsersController.getAuth)
		// POST to /api/auth with email and password will authenticate the user
		.post(passport.authenticate('local'), UsersController.createAuth)
		// DELETE to /api/auth will log the user out
		.delete(UsersController.deleteAuth);

	userRouter.route('/users')
		// POST to /api/users will create a new user
		.post(UsersController.createUser);

	return userRouter;
}