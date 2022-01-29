const express = require("express");
const router = express.Router();

const Area = require("../database/models/Area");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
    const { nombre, isEnabled, _embed } = req.query;
	if (nombre) where.nombre = { [Op.eq]: nombre };
	if (isEnabled) where.isEnabled = { [Op.eq]: isEnabled };
    if (_embed) {
        if (typeof _embed == 'string') {
            include[0] = { association: _embed } // si solo hay un embed lo usa
        } else {
            _embed.forEach((field, i) => {
            	include[i] = { association: field } // si hay más lo itera
            })
        }
	}
	Area.findAll({
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
	const { nombre, isEnabled } = req.body;
	Area.create({
		nombre: nombre,
		isEnabled: isEnabled
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
	Area.findByPk(id)
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
	const { nombre, isEnabled } = req.body;
	Area.update(
		{
			nombre: nombre,
			isEnabled: isEnabled
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
	Area.destroy({
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
