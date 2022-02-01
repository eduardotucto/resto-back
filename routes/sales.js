const express = require("express");
const router = express.Router();

const Sale = require("../database/models/Sale");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
	const {
		identificacionCliente,
		subtotal,
		igv,
		descuento,
		montoTotal,
		cuenta,
		tipo,
		comprobante,
		orderId,
		_embed,
	} = req.query;
	if (identificacionCliente) where.identificacionCliente = { [Op.eq]: identificacionCliente };
	if (subtotal) where.subtotal = { [Op.gte]: subtotal };
	if (igv) where.igv = { [Op.eq]: igv };
	if (descuento) where.descuento = { [Op.eq]: descuento };
	if (montoTotal) where.montoTotal = { [Op.eq]: montoTotal };
	if (cuenta) where.cuenta = { [Op.eq]: cuenta };
	if (tipo) where.tipo = { [Op.eq]: tipo };
	if (comprobante) where.comprobante = { [Op.eq]: comprobante };
    if (orderId) where.orderId = { [Op.eq]: orderId };
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed, order: Sequelize.col("id") }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field, order: Sequelize.col("id") }; // si hay más lo itera
			});
		}
	}
	Sale.findAll({
		include: include,
		where: where,
		order: Sequelize.col("id"),
	})
		.then((resp) => {
			res.json(resp);
		})
		.catch((err) => {
			res.json(err);
		});
});

// CREATE
router.post("/", function (req, res) {
	const {
		identificacionCliente,
		subtotal,
		igv,
		descuento,
		montoTotal,
		cuenta,
		tipo,
		comprobante,
		orderId,
	} = req.body;
	Sale.create({
		identificacionCliente: identificacionCliente,
		subtotal: subtotal,
		igv: igv,
		descuento: descuento,
		montoTotal: montoTotal,
		cuenta: cuenta,
		tipo: tipo,
		comprobante: comprobante,
        orderId: orderId
	})
		.then((resp) => {
			res.json(resp);
		})
		.catch((err) => {
			res.json(err);
		});
});

// READ
router.get("/:id", function (req, res) {
	const include = [];
	const { _embed } = req.query;
	const { id } = req.params;
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed, order: Sequelize.col("id") }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field, order: Sequelize.col("id") }; // si hay más lo itera
			});
		}
	}
	Sale.findByPk(id, {
		include: include,
	})
		.then((resp) => {
			res.json(resp);
		})
		.catch((err) => {
			res.json(err);
		});
});

// UPDATE
router.patch("/:id", function (req, res) {
	const { id } = req.params;
	const {
		identificacionCliente,
		subtotal,
		igv,
		descuento,
		montoTotal,
		cuenta,
		tipo,
		comprobante,
		orderId,
	} = req.body;
	Sale.update(
		{
			identificacionCliente: identificacionCliente,
			subtotal: subtotal,
			igv: igv,
			descuento: descuento,
			montoTotal: montoTotal,
			cuenta: cuenta,
			tipo: tipo,
			comprobante: comprobante,
			orderId: orderId,
		},
		{
			where: {
				id: id,
			},
		}
	)
		.then(() => {
			return Sale.findByPk(id);
		})
		.then((resp) => {
			res.json(resp);
		})
		.catch((err) => {
			res.json(err);
		});
});

//DELETE
router.delete("/:id", function (req, res) {
	const { id } = req.params;
	Sale.destroy({
		where: {
			id: id,
		},
	})
		.then((resp) => {
			res.json(resp);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;
