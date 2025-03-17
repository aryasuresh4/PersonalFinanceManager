const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
  try {
    const { amount, category, type, date } = req.body;
    const newTransaction = new Transaction({
      amount, category, type, date, userId: req.user.userId
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
