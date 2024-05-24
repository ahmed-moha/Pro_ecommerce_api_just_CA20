const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    name: { type: String, default: "EVC",enum:["EVC","CASH"] },
    des: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", PaymentSchema);
