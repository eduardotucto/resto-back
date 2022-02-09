const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Category extends Model {}
Category.init(
	{
		descripcion: DataTypes.STRING,
		imgUrl: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "category",
	}
);

module.exports = Category;
