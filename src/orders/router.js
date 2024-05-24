const express = require("express");
const { createOrder, getOrders } = require("./controller");
const router = express.Router();
router.post("/create", createOrder);
router.get("/", getOrders);
// router.get("/:id", getPayment);
module.exports = router