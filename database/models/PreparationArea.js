const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class PreparationArea extends Model {}
PreparationArea.init(
	{
		nombre: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "preparationArea",
	}
);

module.exports = PreparationArea;
