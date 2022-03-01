const express = require("express");
const router = express.Router();
const { Cloudinary } = require("../util/cloudinary");

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
			include[0] = { association: _embed, order: Sequelize.col("id") }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field, order: Sequelize.col("id") }; // si hay más lo itera
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
	const { descripcion, base64Img } = req.body;

	Cloudinary.uploader
		.upload(base64Img, {
			upload_preset: "categories",
		})
		.then(resp => {
			return Category.create({
				descripcion: descripcion,
				imgUrl: resp.secure_url || "",
			});
		})
		.then(resp => {
			res.json(resp);
		})
		.catch(err => {
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
	Category.findByPk(id, {
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
	const { descripcion, base64Img, URLstring } = req.body;

	const indexOfFirst = URLstring.indexOf("Categories");
	const publid_id = URLstring.slice(indexOfFirst, URLstring.length - 4);

	Cloudinary.uploader.destroy(publid_id)
		.then(resp => {
			if (resp.result == "ok") {
				return Cloudinary.uploader.upload(base64Img, {
					upload_preset: "categories",
				});
			} else {
				throw new Error(resp.result);
			}
		})
		.then(resp => {
			Category.update(
				{
					descripcion: descripcion,
					imgUrl: resp.secure_url || "",
				},
				{
					where: {
						id: id,
					},
				}
			);
		})
		.then(resp => {
			if (resp == 0) {
				throw new Error("Ningun campo ha sido actualizado");
			} else {
				return Category.findByPk(id);
			}
		})
		.then(resp => {
			res.json(resp);
		})
		.catch(err => {
			res.status(300).send(err.message);
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
