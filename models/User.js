var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var user = new mongoose.Schema({
	email: String,
	username: String,
	password: String

},

	{
		collection: 'Users',
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
	
);


module.exports = mongoose.model('User', user);

module.exports.hashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	} catch(error) {
		throw new Error('Hashing failed', error);
	}
}