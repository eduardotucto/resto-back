const express = require("express");
const router = express.Router();
const { Cloudinary } = require("../util/cloudinary");

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
	const {
		nombre,
		isActive,
		isInventoryTracked,
		preparationAreaId,
		categoryId,
		base64Img,
	} = req.body;

	Cloudinary.uploader
		.upload(base64Img, {
			upload_preset: "products",
		})
		.then(resp => {
			return Product.create({
				nombre: nombre,
				isActive: isActive,
				isInventoryTracked: isInventoryTracked,
				preparationAreaId: preparationAreaId,
				categoryId: categoryId,
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
	const {
		nombre,
		isActive,
		isInventoryTracked,
		preparationAreaId,
		categoryId,
		base64Img,
		URLstring,
	} = req.body;

	const indexOfFirst = URLstring.indexOf("Products");
	const publid_id = URLstring.slice(indexOfFirst, URLstring.length - 4);

	Cloudinary.uploader.destroy(publid_id)
		.then(resp => {
			if (resp.result == "ok") {
				return Cloudinary.uploader.upload(base64Img, {
					upload_preset: "products",
				});
			} else {
				throw new Error(resp.result);
			}
		})
		.then(resp => {
			Product.update(
				{
					nombre: nombre,
					isActive: isActive,
					isInventoryTracked: isInventoryTracked,
					preparationAreaId: preparationAreaId,
					categoryId: categoryId,
					imgUrl: resp.secure_url || '',
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
				return Product.findByPk(id);
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
