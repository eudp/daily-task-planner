const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	email: String,
	userName: String,
	password: String,
	email: {
		type: String,
		required: true,
		index: { unique: true }
	}

},

	{
		collection: 'users',
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
	
);

UserSchema.pre('save', async function (next) {
	const user = this;

	// only hash the password if it has changed or is new
	if (!user.isModified('password')) {
		return next();
	}

	try {

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);

		user.password = hash;

		next();

	} catch(error) {
		throw error;
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