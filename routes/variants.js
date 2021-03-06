const express = require("express");
const router = express.Router();

const Variant = require("../database/models/Variant");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
	const { descripcion, stock, price, productId, _embed } = req.query;
	if (descripcion) where.descripcion = { [Op.eq]: descripcion };
	if (stock) where.stock = { [Op.eq]: stock };
	if (price) where.price = { [Op.eq]: price };
	if (productId) where.productId = { [Op.eq]: productId };
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed, order: Sequelize.col("id") }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field, order: Sequelize.col("id") }; // si hay más lo itera
			});
		}
	}
	Variant.findAll({
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
	const { descripcion, stock, price, productId } = req.body;
	Variant.create({
		descripcion: descripcion,
		stock: stock,
		price: price,
		productId: productId,
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
	Variant.findByPk(id, {
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
	const { descripcion, stock, price, productId } = req.body;
	Variant.update(
		{
			descripcion: descripcion,
			stock: stock,
			price: price,
			productId: productId,
		},
		{
			where: {
				id: id,
			},
		}
	)
		.then((resp) => {
			if (resp == 0) {
				throw new Error("Error al actualizar la presentación: " + descripcion);
			} else {
				return Variant.findByPk(id);
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
	Variant.destroy({
		where: {
			id: id,
		},
	})
		.then(resp => {
			if (resp == 0) {
				throw new Error(
					"Error al intentar eliminar el recurso"
				);
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
