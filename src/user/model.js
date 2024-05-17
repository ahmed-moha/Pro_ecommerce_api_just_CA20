const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
    photoUrl: { type: String,},
    userType: {
        type: String,
        enum: ["User", "Admin", "Delivery"],
        default: "User"
    }
}, {
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
UserSchema.virtual("photoURL").get(function () {
    console.log("CALLED ✅🥺❤😅")
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (urlRegex.test(this.photo)) {
      return this.photo;
    } else {
      return (
        (process.env.IMAGE_URL || 'http://localhost:7900/') +
        (this.photo ? this.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
      );
    }
});
module.exports=mongoose.model("UserModel",UserSchema)