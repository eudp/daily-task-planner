var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: String,
	userName: String,
	password: String

},

	{
		collection: 'users',
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		},
		index: { unique: true }
	}
	
);

UserSchema.pre('save', async function(next) {
	const user = this;

	if (!user.isModified('password')) {
		return next();
	}

	try {

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);

		user.password = hash;

		next();

	} catch(error) {
		throw new Error('Hashing failed', error);
	}

});

UserSchema.methods.validatePassword = function (candidatePassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
			if (err) return reject(err);
			resolve(isMatch);
		});
	});
};


module.exports = mongoose.model('User', UserSchema);