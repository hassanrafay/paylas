class CustomError extends Error {
	constructor(statusCode, message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

const errorHandler = (err, req, res, next) => {
	console.log(err);
	const { statusCode, message } = err;
	res.status(err.statusCode || 500);

	res.json({
		success: false,
		statusCode,
		message: message || 'something went wrong'
	});
};
module.exports = {
	CustomError,
	errorHandler
};
