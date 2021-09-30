const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User } = require('../database/models');
const { secret, tokenLife } = require('../config/config');
const { CustomError } = require('../lib/error-handler');

class UserController {
	register = async (req, res, next) => {
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ where: { email } });
			if (user) {
				throw new CustomError(409, 'User already exists');
			}
			const hashedPassword = await bcrypt.hash(password, 10);

			user = await User.create({
				name,
				email,
				password: hashedPassword
			});
			user.password = undefined;

			return res.json({
				success: true,
				message: 'Registered successfully.',
				data: user
			});
		} catch (error) {
			next(error);
		}
	};

	login = async (req, res, next) => {
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ where: { email } });

			if (!user) {
				throw new CustomError(404, "User doesn't exists.");
			}
			const isPasswordCorrect = await bcrypt.compare(password, user.password);
			if (!isPasswordCorrect) {
				throw new CustomError(400, "Couldn't log you in.");
			}

			user.password = undefined;
			const token = jwt.sign({ id: user }, secret, {
				expiresIn: tokenLife
			});
			return res.json({
				success: true,
				message: 'You are logged in successfully.',
				data: {
					user,
					token
				}
			});
		} catch (error) {
			next(error);
		}
	};
}

const userController = new UserController();
module.exports = userController;
