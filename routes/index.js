const express = require('express');
const router = express.Router();

module.exports = function(passport) {

	router.use('/api', require('./users.route')(passport));
	router.use('/api', require('./tasks.route'));
	router.use(require('./htmlRoutes'));

	return router;

}
