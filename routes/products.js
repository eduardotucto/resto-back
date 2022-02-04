const express = require("express");
const router = express.Router();

const Product = require("../database/models/Product");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
	const { nombre, isActive, isInventoryTracked, preparationAreaId, categoryId, _embed } = req.query;
	if (nombre) where.nombre = { [Op.eq]: nombre };
	if (isActive) where.isActive = { [Op.eq]: isActive };
	if (isInventoryTracked) where.isInventoryTracked = { [Op.eq]: isInventoryTracked };
	if (preparationAreaId) where.preparationAreaId = { [Op.eq]: preparationAreaId };
	if (categoryId) where.categoryId = { [Op.eq]: categoryId };
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed, order: Sequelize.col("id") }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field, order: Sequelize.col("id") }; // si hay más lo itera
			});
		}
	}
	Product.findAll({
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
	const { nombre, isActive, isInventoryTracked, preparationAreaId, categoryId } = req.body;
	Product.create({
		nombre: nombre,
		isActive: isActive,
		isInventoryTracked: isInventoryTracked,
		preparationAreaId: preparationAreaId,
		categoryId: categoryId,
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
	Product.findByPk(id, {
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
	const { nombre, isActive, isInventoryTracked, preparationAreaId, categoryId } = req.body;
	Product.update(
		{
			nombre: nombre,
			isActive: isActive,
			isInventoryTracked: isInventoryTracked,
			preparationAreaId: preparationAreaId,
			categoryId: categoryId,
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
				return Product.findByPk(id);
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
	Product.destroy({
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
