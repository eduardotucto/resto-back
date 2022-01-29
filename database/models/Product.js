const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Product extends Model {}
Product.init(
	{
		nombre: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN,
		isInventoryTracked: DataTypes.BOOLEAN,
	},
	{
		sequelize,
		modelName: "product",
	}
);

module.exports = Product;
