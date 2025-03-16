const Transaction = require("../models/TransactionModel");

// ✅ Add a new transaction
const addTransaction = async (req, res) => {
    try {
        const { type, amount, category, date } = req.body;

        if (!type || !amount || !category || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTransaction = await Transaction.create({
            user: req.user._id,  // Get user from token
            type,
            amount,
            category,
            date,
        });

        res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get transactions for logged-in user
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Check if the logged-in user owns this transaction
        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await transaction.remove();
        res.json({ message: "Transaction removed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { addTransaction, getTransactions, deleteTransaction };
