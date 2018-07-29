const User = require('../models/User');

exports.checkEmail = async function (email) {
	try {

		return await User.findOne({'email' : email });

	} catch (err) {
		throw 'Error while checking email';
	}
}

exports.createUser = async function (user) {
	const newUser = new User(user);
	try {

		return await newUser.save();

	} catch (err) {
		throw 'Error while creating user';
	}
}