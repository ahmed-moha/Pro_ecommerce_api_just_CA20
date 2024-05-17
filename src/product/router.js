const express = require("express");
const { createProduct, getProducts, getProduct } = require("./controller");
const { upload } = require("../multer.js");
const router = express.Router();
router.post("/create", upload.array("photos"), createProduct);
router.get("/",getProducts);
router.get("/:id",getProduct);

module.exports = router;
