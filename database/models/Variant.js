const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Variant extends Model {}
Variant.init(
	{
		descripcion: DataTypes.STRING,
		stock: DataTypes.FLOAT(10, 3),
		price: DataTypes.FLOAT(10, 3),
	},
	{
		sequelize,
		modelName: "variant",
	}
);

module.exports = Variant;
