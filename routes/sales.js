const express = require("express");
const router = express.Router();

const Sale = require("../database/models/Sale");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
	let offset = null;
	let limit = null;
	let orderedBy = [];

	const {
		identificacionCliente,
		UTC_created_at,
		subtotal,
		igv,
		descuento,
		montoTotal,
		cuenta,
		tipo,
		comprobante,
		orderId,
		createdBetween,
		_offset,
		_limit,
		_sort,
		_order,
		_embed,
	} = req.query;
	if (UTC_created_at) where.UTC_created_at = { [Op.gte]: UTC_created_at };
	if (identificacionCliente) where.identificacionCliente = { [Op.eq]: identificacionCliente };
	if (subtotal) where.subtotal = { [Op.gte]: subtotal };
	if (igv) where.igv = { [Op.eq]: igv };
	if (descuento) where.descuento = { [Op.eq]: descuento };
	if (montoTotal) where.montoTotal = { [Op.eq]: montoTotal };
	if (cuenta) where.cuenta = { [Op.eq]: cuenta };
	if (tipo) where.tipo = { [Op.eq]: tipo };
	if (comprobante) where.comprobante = { [Op.eq]: comprobante };
    if (orderId) where.orderId = { [Op.eq]: orderId };

	if (createdBetween) where.UTC_created_at = {
		[Op.between]: [createdBetween[0], createdBetween[1]],
	};
	if (_offset) offset = parseInt(_offset);
	if (_limit) limit = parseInt(_limit);
	if (_sort && _order) {
		orderedBy = [[_sort, _order]];
	};
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed, order: Sequelize.col("id") }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field, order: Sequelize.col("id") }; // si hay más lo itera
			});
		}
	}
	Sale.findAndCountAll({
		include: include,
		where: where,
		order: orderedBy, // order: [["UTC_created_at", "DESC"]],
		offset: offset,
		limit: limit,
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
		UTC_created_at,
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
		UTC_created_at: UTC_created_at,
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
		UTC_created_at,
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
			UTC_created_at: UTC_created_at,
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
		.then((resp) => {
			if (resp == 0) {
				throw new Error("Ningun campo ha sido actualizado");
			} else {
				return Sale.findByPk(id);
			}
		})
		.then((resp) => {
			res.json(resp);
		})
		.catch((err) => {
			res.status(300).send(err.message);
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
		.then(resp => {
			if (resp == 0) {
				throw new Error("Error al intentar eliminar el recurso");
			} else {
				resp = {
					msg: "Eliminado con exito",
					elementId: id,
				};
				res.json(resp);
			}
		})
		.catch(err => {
			res.status(400).json(err.message);
		});
});

module.exports = router;
