const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Sale extends Model {}
Sale.init(
	{
		identificacionCliente: DataTypes.STRING,
		UTC_created_at: DataTypes.BIGINT,
		subtotal: DataTypes.FLOAT(10, 3),
		igv: DataTypes.FLOAT(10, 3),
		descuento: DataTypes.FLOAT(10, 3),
		montoTotal: DataTypes.FLOAT(10, 3),
		cuenta: DataTypes.STRING,
		tipo: DataTypes.STRING,
		comprobante: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "sale",
	}
);

module.exports = Sale;
