// const express = require("express");

// const { addTransaction, getTransactions } = require("../controllers/transactionController");
// const authMiddleware = require("../middleware/authMiddleware"); // ✅ Import middleware
// const router = express.Router();
// router.post("/", authMiddleware, addTransaction); // ✅ Require authentication for adding transactions
// router.get("/", authMiddleware, getTransactions); // ✅ Require authentication for getting transactions

// module.exports = router;
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ GET all transactions for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Add Transaction with userId
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, category, type, date } = req.body;

    if (!amount || !category || !type || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("🟡 Backend received transaction:", req.body);

    const newTransaction = new Transaction({
      userId: req.user.id, // ✅ Ensure transaction is linked to logged-in user
      amount,
      category,
      type,
      date,
    });

    await newTransaction.save();
    console.log("✅ Transaction saved to DB:", newTransaction);

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("❌ Error saving transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

