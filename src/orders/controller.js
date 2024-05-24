const Order = require("./model");
const mongoose = require("mongoose");
const payment = require("../payment/model");
const { payByWaafiPay } = require("../../src/payment");
module.exports = {
  createOrder: async (req, res) => {
    try {
      const {
        user,
        payment: paymentID,
        products,
        total,
        note,
        phone,
      } = req.body;

      console.log(paymentID);
      console.log(phone);
      const paymentMethod = await payment.findById(paymentID);
      if (paymentMethod.name === "CASH") {
        const order = await Order({
          user: user,
          payment: paymentID,
          products: products,
          total: total,
          note: note,
          phone: phone,
        }).save();

        res.status(201).json(order);
      } else {
        const waafiResponse = await payByWaafiPay({
          phone: phone,
          amount: total,
          merchantUid: process.env.merchantUid,
          apiUserId: process.env.apiUserId,
          apiKey: process.env.apiKey,
        });
        if (waafiResponse.status) {
          const order = await Order({
            user: user,
            payment: paymentID,
            products: products,
            total: total,
            note: note,
            phone: phone,
          }).save();

          res.status(201).json(order);
        } else {
          // Handling payment failure
          // return res.status(400).send({
          //   status: "failed",
          //   message: `${waafiResponse.error}` ?? "Payment Failed Try Again",
          // });
          const order = await Order({
            user: user,
            payment: paymentID,
            products: products,
            total: total,
            note: note,
            phone: phone,
          }).save();

          res.status(201).json(order);
        }
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await Order.find()
      
        .populate("payment")
        .populate({
          path: 'products',
          populate: {
              path: 'product', // If products have further nested references
              model: 'Product'        // Model name for products
          }
      });
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
