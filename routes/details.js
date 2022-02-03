const express = require("express");
const router = express.Router();

const Detail = require("../database/models/Detail");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
	const {
		sale_price,
		comentario,
		cant,
		estado,
		toTakeAway,
		UTC_created_at,
		orderId,
		productId,
		variantId,
		_embed,
	} = req.query;
	if (sale_price) where.sale_price = { [Op.eq]: sale_price };
	if (comentario) where.comentario = { [Op.gte]: comentario };
	if (cant) where.cant = { [Op.eq]: cant };
	if (estado) where.estado = { [Op.eq]: estado };
	if (toTakeAway) where.toTakeAway = { [Op.eq]: toTakeAway };
	if (UTC_created_at) where.UTC_created_at = { [Op.eq]: UTC_created_at };
	if (orderId) where.orderId = { [Op.eq]: orderId };
	if (productId) where.productId = { [Op.eq]: productId };
	if (variantId) where.variantId = { [Op.eq]: variantId };
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed, order: Sequelize.col("id") }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field, order: Sequelize.col("id") }; // si hay más lo itera
			});
		}
	}
	Detail.findAll({
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
		sale_price,
		comentario,
		cant,
		estado,
		toTakeAway,
		UTC_created_at,
		orderId,
		productId,
		variantId
	} = req.body;
	Detail.create({
		sale_price: sale_price,
		comentario: comentario,
		cant: cant,
		estado: estado,
		toTakeAway: toTakeAway,
		UTC_created_at: UTC_created_at,
		orderId: orderId,
		productId: productId,
		variantId: variantId
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
	Detail.findByPk(id, {
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
		sale_price,
		comentario,
		cant,
		estado,
		toTakeAway,
		UTC_created_at,
		orderId,
		productId,
		variantId
	} = req.body;
	Detail.update(
		{
			sale_price: sale_price,
			comentario: comentario,
			cant: cant,
			estado: estado,
			toTakeAway: toTakeAway,
			UTC_created_at: UTC_created_at,
			orderId: orderId,
			productId: productId,
			variantId: variantId,
		},
		{
			where: {
				id: id,
			},
		}
	)
		.then(() => {
			return Detail.findByPk(id);
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
	Detail.destroy({
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
