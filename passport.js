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
	
	passport.serializeUser((user, done) => {
		console.log(`serializing user: `, user);
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {

		try { 

			const user = await User.findById(id).exec();
	
			console.log(`deserializing user:`, user);
			done(null, user);

		} catch (err) {
			done(err)
		}
	});

	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	async (email, password, done) => {
		const errorMsg = 'Invalid email or password';

		try {

			const user = await User.findOne({email}).exec();
	
			if (!user) {
				return done(null, false, {message:errorMsg});
			}

			return await user.validatePassword(password)
				.then(isMatch => done(null, isMatch ? user : false, isMatch ? null : {message: errorMsg}));

		} catch(err) {
			done(err);
		}
	}));

	app.use(passport.initialize());

	app.use(passport.session());

	return passport;
}