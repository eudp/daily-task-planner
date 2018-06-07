var User = require('./models/User');

module.exports = function (passport){
	
	passport.serializeUser(function(user, done) {
		console.log(`serializing user: `, user);
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log(`deserializing user:`, user);
			done(err, user);
		});
	});

}