const express = require("express");
const { createPayment, getPayment, getPayments } = require("./controller");
const router = express.Router();
router.post("/create", createPayment);
router.get("/:id", getPayment);
router.get("/", getPayments);
module.exports = router;
