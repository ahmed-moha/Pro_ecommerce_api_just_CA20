const express=require("express");
const { createUser, login,getUser } = require("./controller");
const {upload}=require("../multer.js");
const router=express.Router();

router.post("/register",upload.single("photo"),createUser);
router.post("/login",login);
router.get("/:id",getUser);

module.exports=router