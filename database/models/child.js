'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Child extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			Child.belongsTo(models.User, {
				foreignKey: 'parentId'
			});
			Child.hasMany(models.CreditCard, { foreignKey: 'childId' });
		}
	}
	Child.init(
		{
			age: DataTypes.INTEGER,
			name: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Child'
		}
	);
	return Child;
};
