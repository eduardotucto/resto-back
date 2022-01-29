const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Table extends Model {}
Table.init(
	{
		nombre: DataTypes.STRING,
		estado: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN,
	},
	{
		sequelize,
		modelName: "table",
	}
);

module.exports = Table;
