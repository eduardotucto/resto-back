const express = require("express");
const router = express.Router();

const Table = require("../database/models/Table");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
	const { nombre, estado, isActive, areaId, _embed } = req.query;
	if (nombre) where.nombre = { [Op.eq]: nombre };
	if (estado) where.estado = { [Op.eq]: estado };
	if (isActive) where.isActive = { [Op.eq]: isActive };
	if (areaId) where.areaId = { [Op.eq]: areaId };
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field }; // si hay más lo itera
			});
		}
	}
	Table.findAll({
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
	const { nombre, estado, isActive, areaId } = req.body;
	Table.create({
		nombre: nombre,
		estado: estado,
		isActive: isActive,
		areaId: areaId,
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
	Table.findByPk(id)
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
	const { nombre, estado, isActive, areaId } = req.body;
	Table.update(
		{
			nombre: nombre,
			estado: estado,
			isActive: isActive,
			areaId: areaId,
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
	Table.destroy({
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