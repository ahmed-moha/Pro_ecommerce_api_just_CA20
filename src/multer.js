const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },

  filename: function (req, file, cb) {
    if (file) {
      var uniqueName = uuid.v4() + path.extname(file.originalname);
      cb(null, uniqueName);
    }
  },
});

var upload = multer({ storage: storage });

module.exports = { upload };