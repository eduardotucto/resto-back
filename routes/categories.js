const express = require("express");
const router = express.Router();

const Category = require("../database/models/Category");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
	const { descripcion, _embed } = req.query;
	if (descripcion) where.descripcion = { [Op.eq]: descripcion };
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field }; // si hay más lo itera
			});
		}
	}
	Category.findAll({
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
	const { descripcion } = req.body;
	Category.create({
		descripcion: descripcion,
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
	const { id } = req.params;
	Category.findByPk(id)
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
	const { descripcion } = req.body;
	Category.update(
		{
			descripcion: descripcion,
		},
		{
			where: {
				id: id,
			},
		}
	)
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
	Category.destroy({
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
