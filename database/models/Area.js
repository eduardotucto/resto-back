const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Area extends Model {}
Area.init(
	{
		nombre: DataTypes.STRING,
		isEnabled: DataTypes.BOOLEAN,
	},
	{
		sequelize,
		modelName: "area",
	}
);

module.exports = Area;
