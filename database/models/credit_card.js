'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CreditCard extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			CreditCard.belongsTo(models.Child, {
				foreignKey: 'childId'
			});
			CreditCard.belongsTo(models.User, {
				foreignKey: 'userId'
			});
		}
	}
	CreditCard.init(
		{
			type: DataTypes.STRING,
			number: DataTypes.STRING,
			code: DataTypes.INTEGER,
			expiryDate: DataTypes.DATE,
			monthlyLimit: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'CreditCard'
		}
	);
	return CreditCard;
};
