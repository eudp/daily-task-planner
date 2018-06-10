var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (!req.user) {
 		res.redirect('/login');
 	} else {
 		res.render('index', {user: req.user})
 	}
});

module.exports = router;
