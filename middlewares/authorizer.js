var jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

const authorizer = async (req, res, next) => {
	const token = req.headers.Authorization ? req.headers.Authorization : req.headers.authorization;

	if (!token) {
		return res.status(401).send({
			success: false,
			message: 'Unauthorized request.',
			data: null
		});
	}
	try {
		const decoded = await jwt.verify(token, secret);
		req.user = decoded.id;
		console.log('decoded: ', decoded);

		next();
	} catch (error) {
		return res.status(304).send({
			success: false,
			message: 'Token is invalid request.',
			data: null
		});
	}
};

module.exports = authorizer;
