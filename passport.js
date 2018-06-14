const session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var User = require('./models/User');

module.exports = (app) => {

	app.use(cookieParser());

	app.use(session({
		cookie: { maxAge: 60000},
		secret: 'keyboard cat',
		saveUninitialized: false,
		resave: false
	}));

	app.use(flash());
	
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

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	(email, password, done) => {
		const errorMsg = 'Invalid email or password';
		User.findOne({email})
			.then(user => {

				if (!user) {
					return done(null, false, {message:errorMsg});
				}

				return user.validatePassword(password)
					.then(isMatch => done(null, isMatch ? user : false, isMatch ? null : {message: errorMsg}));
			})
			.catch(done);
	}));

	app.use(passport.initialize());

	app.use(passport.session());
}