const Transaction = require("../models/Transaction");

const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;
    const userId = req.user.id; // Extract user ID from JWT token

    if (!type || !amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTransaction = new Transaction({
      user: userId, // Store the logged-in user's ID
      type,
      amount,
      category,
      date: date || new Date(), // Default to current date if not provided
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
  } catch (error) {
    console.error("❌ Error adding transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
};





// ✅ Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    console.log("Fetching transactions...");
    const transactions = await Transaction.find({ userId: req.user?.userId });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
