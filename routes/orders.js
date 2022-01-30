const express = require("express");
const router = express.Router();

const Order = require("../database/models/Order");

const { Sequelize, Op } = require("sequelize");

// INDEX
router.get("/", function (req, res) {
	const include = [];
	const where = {};
	const {
		customerName,
		UTC_created_at_gte,
		orderState,
		isInTable,
		dinersNumber,
		waiterName,
		isDelivery,
		isToTakeAway,
		wasCanceled,
		customerAddress,
		addressReference,
		customerPhone,
		amountDue,
		tableId,
		_embed,
	} = req.query;
	if (customerName) where.customerName = { [Op.eq]: customerName };
	if (UTC_created_at_gte) where.UTC_created_at = { [Op.gte]: UTC_created_at_gte };
	if (orderState) where.orderState = { [Op.eq]: orderState };
	if (isInTable) where.isInTable = { [Op.eq]: isInTable };
	if (dinersNumber) where.dinersNumber = { [Op.eq]: dinersNumber };
	if (waiterName) where.waiterName = { [Op.eq]: waiterName };
	if (isDelivery) where.isDelivery = { [Op.eq]: isDelivery };
	if (isToTakeAway) where.isToTakeAway = { [Op.eq]: isToTakeAway };
	if (wasCanceled) where.wasCanceled = { [Op.eq]: wasCanceled };
	if (customerAddress) where.customerAddress = { [Op.eq]: customerAddress };
	if (addressReference) where.addressReference = { [Op.eq]: addressReference };
	if (customerPhone) where.customerPhone = { [Op.eq]: customerPhone };
	if (amountDue) where.amountDue = { [Op.eq]: amountDue };
	if (tableId) where.tableId = { [Op.eq]: tableId };
	if (_embed) {
		if (typeof _embed == "string") {
			include[0] = { association: _embed }; // si solo hay un embed lo usa
		} else {
			_embed.forEach((field, i) => {
				include[i] = { association: field }; // si hay más lo itera
			});
		}
	}
	Order.findAll({
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
		customerName,
		UTC_created_at,
		orderState,
		isInTable,
		dinersNumber,
		waiterName,
		isDelivery,
		isToTakeAway,
		wasCanceled,
		customerAddress,
		addressReference,
		customerPhone,
		amountDue,
		tableId
	} = req.body;
	Order.create({
		customerName: customerName,
		UTC_created_at: UTC_created_at,
		orderState: orderState,
		isInTable: isInTable,
		dinersNumber: dinersNumber,
		waiterName: waiterName,
		isDelivery: isDelivery,
		isToTakeAway: isToTakeAway,
		wasCanceled: wasCanceled,
		customerAddress: customerAddress,
		addressReference: addressReference,
		customerPhone: customerPhone,
		amountDue: amountDue,
		tableId: tableId
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
	Order.findByPk(id)
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
		customerName,
		UTC_created_at,
		orderState,
		isInTable,
		dinersNumber,
		waiterName,
		isDelivery,
		isToTakeAway,
		wasCanceled,
		customerAddress,
		addressReference,
		customerPhone,
		amountDue,
		tableId,
	} = req.body;
	Order.update(
		{
			customerName: customerName,
            UTC_created_at: UTC_created_at,
            orderState: orderState,
            isInTable: isInTable,
            dinersNumber: dinersNumber,
            waiterName: waiterName,
            isDelivery: isDelivery,
            isToTakeAway: isToTakeAway,
            wasCanceled: wasCanceled,
            customerAddress: customerAddress,
            addressReference: addressReference,
            customerPhone: customerPhone,
            amountDue: amountDue,
            tableId: tableId
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
	Order.destroy({
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
