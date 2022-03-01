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
			include[0] = { association: _embed, order: Sequelize.col("id") }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field, order: Sequelize.col("id") }; // si hay más lo itera
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
	Table.findByPk(id, {
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
			if (resp == 0) {
				throw new Error("Ningun campo ha sido actualizado");
			} else {
				return Table.findByPk(id);
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
	Table.destroy({
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
