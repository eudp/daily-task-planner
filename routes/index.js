const express = require('express');
const router = express.Router();

module.exports = function(passport) {

	router.use('/api', require('./users')(passport));
	router.use('/api', require('./tasks'));
	router.use(require('./htmlRoutes'));

	return router;

}
