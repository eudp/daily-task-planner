const Joi  = require('joi');
const UsersService = require('../services/users.service.js');

// Validation schema for Joi

const userSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	userName: Joi.string().required(),
	password: Joi.string().regex(/^[a-zA-z0-9]{6,30}$/).required(),
	confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

function getCurrentUser(req, res) {
	
	const { id, email, userName } = req.user;
	res.json({
		id, email, userName
	});

}

exports.getAuth = (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'You are not currently logged in.'
		});
	}
	getCurrentUser(req, res);
}

exports.createAuth = (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'Invalid username or password.'
		});
	}

	getCurrentUser(req,res);
}

exports.deleteAuth = (req,res) => {
	req.logout();
	req.session.destroy();
	res.json({
		message: 'You have been logged out.'
	});
}

exports.createUser = async (req, res, next) => {
			try {
				const result = Joi.validate(req.body, userSchema);

				if (result.error) {
					return res.status(400).json({
						message: 'Data entered is not valid. Please try again.'
					});
				}

				const user = await UsersService.checkEmail(result.value.email);
				if (user) {
					return res.status(400).json({
						message: 'Email is already in use.'
					});
				}

				delete result.value.confirmationPassword;

				const userSaved = await UsersService.createUser(result.value);
				
				const { id, userName } = userSaved;

				res.json({
					id, userName
				});

			} catch(err) {
				return next(new Error(err));
			}
		}