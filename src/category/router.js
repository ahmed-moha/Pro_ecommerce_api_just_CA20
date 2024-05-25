const express = require("express");
const { createCategory,getCategory,getCategories } = require("./controller");
const {upload}=require("../multer.js");
const router = express.Router();
router.post("/create",upload.single("photo"), createCategory);
router.get("/:id",getCategory);
router.get("/",getCategories);

module.exports = router