const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const User = require('./models/User');

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

			const isMatch =  await user.validatePassword(password);

			done(null, isMatch ? user : false, isMatch ? null : {message: errorMsg});

		} catch(err) {
			done(err);
		}
	}));

	app.use(passport.initialize());

	app.use(passport.session());

	return passport;
}