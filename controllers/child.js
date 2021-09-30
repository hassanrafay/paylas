const { Child } = require('../database/models');
const { CustomError } = require('../lib/error-handler');

class ChildController {
	getAll = async (req, res, next) => {
		const { id: parentId } = req.user;

		try {
			const children = await Child.findAll({
				where: {
					parentId
				}
			});

			return res.json({
				success: true,
				message: 'Children retrieved successfully.',
				data: { children }
			});
		} catch (error) {
			next(error);
		}
	};

	get = async (req, res, next) => {
		const { id: parentId } = req.user;
		const { id } = req.params;

		try {
			const child = await Child.findOne({
				where: { id, parentId }
			});

			if (!child) {
				throw new CustomError(404, 'Child not found');
			}

			return res.json({
				success: true,
				message: 'Child retrieved successfully.',
				data: child
			});
		} catch (error) {
			next(error);
		}
	};

	create = async (req, res, next) => {
		const { id: parentId } = req.user;
		const { name, age } = req.body;
		try {
			const child = await Child.create({
				name,
				age,
				parentId
			});

			return res.json({
				success: true,
				message: 'Child created successfully.',
				data: child
			});
		} catch (error) {
			next(error);
		}
	};

	update = async (req, res, next) => {
		const { id: parentId } = req.user;
		const { id } = req.params;
		const { name, age } = req.body;

		try {
			let child = await Child.findOne({ where: { id, parentId } });
			if (!child) {
				throw new CustomError(404, "Child doesn't exists");
			}

			child.name = name ? name : child.name;
			child.age = age ? age : child.age;
			child = await child.save();

			return res.json({
				success: true,
				message: 'Child updated successfully.',
				data: child
			});
		} catch (error) {
			next(error);
		}
	};

	delete = async (req, res, next) => {
		const { id: parentId } = req.user;
		const { id } = req.params;
		try {
			await Child.destroy({
				where: {
					id,
					parentId
				}
			});

			return res.json({
				success: true,
				message: 'Child deleted successfully.',
				data: null
			});
		} catch (error) {
			next(error);
		}
	};
}

const childController = new ChildController();
module.exports = childController;
