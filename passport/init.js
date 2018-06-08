var User = require('../models/User');

module.exports = (passport, LocalStrategy) => {
	
	passport.serializeUser(function(user, done) {
		console.log(`serializing user: `, user);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id)
			.then(function(user) {
				console.log(`deserializing user:`, user);
				done(null, user);
			})
			.catch(function(err) {
				done(err);
			})
	});

	passport.use(new LocalStrategy((userName, password, done) => {
		const errorMsg = 'Invalid username or password';

		User.findOne({userName})
			.then(user => {

				if (!user) {
					return done(null, false, {message:errorMsg});
				}

				return user.validatePassword(password)
					.then(isMatch => done(null, isMatch ? user : false, isMatch ? null : {message: errorMsg}));
			})
			.catch(done);
	}));
}