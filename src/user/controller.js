const User = require("./model");
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, username, password } = req.body;
      const photo=req.file.path
      let correctedPath =process.env.IMAGE_URL + photo.replace(/\\/g, "/");
      console.log("PHOTO",photo)
      console.log("password",password)
      console.log("username",username)
      console.log("name",name)
      const encryptedPassword = CryptoJS.AES.encrypt(
        password.toString(),
        process.env.PASS_SEC
      ).toString();
      const user = await User({
        username: username,
        password: encryptedPassword,
        name: name,
        photo:correctedPath
      }).save();
      const token = jwt.sign(
        {
          data: user._id,
        },
        process.env.JWT_SEC,
        { expiresIn: "7d" }
      );
      res.status(200).json({
        message: "user created successfully",
        data: { ...user._doc, token },
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      // console.log(user.password);
      const decryptedPassword = CryptoJS.AES.decrypt(
        user._doc.password,
        process.env.PASS_SEC
      ).toString(CryptoJS.enc.Utf8);

      console.log(decryptedPassword);
      console.log(password);
      if (decryptedPassword != password) {
        return res.status(400).json({ error: "Wrong password" });
      }
      const token = jwt.sign(
        {
          data: user._id,
        },
        process.env.JWT_SEC,
        { expiresIn: "7d" }
      );

     return res.status(200).json({
        status: "success",
        data: { ...user._doc,token },
      });
    } catch (e) {
      return res.status(401).json({error:e.message});
    }
  },
  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      console.log("id",id)
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
   

     return res.status(200).json({
        status: "success",
        data: { ...user._doc },
      });
    } catch (e) {
      return res.status(400).json({error:e.message});
    }
  },
};
