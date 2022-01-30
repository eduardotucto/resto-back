const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Order extends Model {}
Order.init(
	{
		customerName: DataTypes.STRING,
		UTC_created_at: DataTypes.BIGINT,
		orderState: DataTypes.INTEGER,
		isInTable: DataTypes.BOOLEAN,
		dinersNumber: DataTypes.INTEGER,
		waiterName: DataTypes.STRING,
		isDelivery: DataTypes.BOOLEAN,
		isToTakeAway: DataTypes.BOOLEAN,
		wasCanceled: DataTypes.BOOLEAN,
		customerAddress: DataTypes.STRING,
		addressReference: DataTypes.STRING,
		customerPhone: DataTypes.STRING,
		amountDue: DataTypes.FLOAT(10, 3),
	},
	{
		sequelize,
		modelName: "order",
	}
);

module.exports = Order;
