const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Detail extends Model {}
Detail.init(
	{
		sale_price: DataTypes.FLOAT(10, 3),
		comentario: DataTypes.STRING,
		cant: DataTypes.INTEGER,
		estado: DataTypes.INTEGER,
		toTakeAway: DataTypes.BOOLEAN,
		UTC_created_at: DataTypes.BIGINT,
		/**
		 * orderId
		 * productId
		 */
	},
	{
		sequelize,
		modelName: "detail",
	}
);

module.exports = Detail;
