const { CreditCard, Child } = require('../database/models');
const { CustomError } = require('../lib/error-handler');

class CreditCardController {
	getAll = async (req, res, next) => {
		const { id: userId } = req.user;

		try {
			const creditCards = await CreditCard.findAll({
				where: {
					userId
				},
				include: {
					model: Child
				}
			});

			return res.json({
				success: true,
				message: 'Credit Cards retrieved successfully.',
				data: { creditCards }
			});
		} catch (error) {
			next(error);
		}
	};

	get = async (req, res, next) => {
		const { id: userId } = req.user;
		const { id } = req.params;

		try {
			const creditCard = await CreditCard.findOne({
				where: { id, userId },
				include: {
					model: Child
				}
			});

			if (!creditCard) {
				throw new CustomError(404, 'Credit Card not found');
			}

			return res.json({
				success: true,
				message: 'Credit Card retrieved successfully.',
				data: creditCard
			});
		} catch (error) {
			next(error);
		}
	};

	create = async (req, res, next) => {
		const { id: userId } = req.user;
		const { type, expiryDate, monthlyLimit, childId } = req.body;

		const number = Math.floor(Math.random() * 8999999999999999 + 1000000000000000);
		const code = Math.floor(Math.random() * 899 + 100);

		try {
			const creditCard = await CreditCard.create({
				type,
				number,
				code,
				expiryDate,
				monthlyLimit,
				childId,
				userId
			});

			return res.json({
				success: true,
				message: 'Credit Card created successfully.',
				data: creditCard
			});
		} catch (error) {
			next(error);
		}
	};

	update = async (req, res, next) => {
		const { id: userId } = req.user;
		const { id } = req.params;
		const { monthlyLimit } = req.body;

		try {
			let creditCard = await CreditCard.findOne({ where: { id, userId } });
			if (!creditCard) {
				throw new CustomError(404, "Credit Card doesn't exists");
			}

			creditCard.monthlyLimit = monthlyLimit ? monthlyLimit : creditCard.monthlyLimit;
			creditCard = await creditCard.save();

			return res.json({
				success: true,
				message: 'Credit Card updated successfully.',
				data: creditCard
			});
		} catch (error) {
			next(error);
		}
	};

	delete = async (req, res, next) => {
		const { id: userId } = req.user;
		const { id } = req.params;
		try {
			await CreditCard.destroy({
				where: {
					id,
					userId
				}
			});

			return res.json({
				success: true,
				message: 'Credit Card deleted successfully.',
				data: null
			});
		} catch (error) {
			next(error);
		}
	};

	charge = async (req, res, next) => {
		const { number, code, expiryDate, amount } = req.body;
		try {
			const creditCard = await CreditCard.findOne({
				where: {
					code,
					number
				}
			});

			if (!creditCard) {
				throw new CustomError(404, "Credit Card doesn't exist.");
			}

			const expiryDateOfCard = new Date(creditCard.expiryDate);
			const providedExpiryDate = new Date(expiryDate);
			console.log(expiryDateOfCard.getMonth(), providedExpiryDate.getMonth());
			if (
				expiryDateOfCard.getMonth() != providedExpiryDate.getMonth() ||
				expiryDateOfCard.getFullYear() != providedExpiryDate.getFullYear()
			) {
				throw new CustomError(400, 'Credit Card information is not correct.');
			}

			if (amount > creditCard.monthlyLimit) {
				throw new CustomError(412, 'Credit Card has exceeded its limit.');
			}

			return res.json({
				success: true,
				message: 'Credit Card has been charged successfully.',
				data: {
					transactionId: 45865,
					amount
				}
			});
		} catch (error) {
			next(error);
		}
	};
}

const creditCardController = new CreditCardController();
module.exports = creditCardController;
