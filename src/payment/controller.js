const Payment = require("./model");
module.exports = {
  createPayment: async (req, res) => {
    try {
      const { name, desc } = req.body;
      const payment = await Payment({ name, desc }).save();
      res.status(201).json(payment);
    } catch (e) {
      res.status(400).json({ error: error.message });
    }
  },
  getPayments: async (req, res) => {
    try {
      const payments = await Payment.find();
      res.status(200).json(payments);
    } catch (e) {
      res.status(400).json({ error: error.message });
    }
  },
  getPayment: async (req, res) => {
    const { id } = req.params;
    try {
      const payment = await Payment.findById(id);
      res.status(200).json( payment );
    } catch (e) {
      res.status(400).json({ error: error.message });
    }
  },
};
