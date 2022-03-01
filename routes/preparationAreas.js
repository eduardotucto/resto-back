const express = require("express");
const router = express.Router();

const PreparationArea = require("../database/models/PreparationArea");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
	const { nombre, _embed } = req.query;
	if (nombre) where.nombre = { [Op.eq]: nombre };
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed, order: Sequelize.col("id") }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field, order: Sequelize.col("id") }; // si hay más lo itera
			});
		}
	}
	PreparationArea.findAll({
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
	const { nombre } = req.body;
	PreparationArea.create({
		nombre: nombre,
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
	PreparationArea.findByPk(id, {
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
	const { nombre } = req.body;
	PreparationArea.update(
		{
			nombre: nombre,
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
				return PreparationArea.findByPk(id);
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
	PreparationArea.destroy({
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
