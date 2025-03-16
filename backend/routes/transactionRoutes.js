// const express = require("express");
// const mongoose = require("mongoose");
// const Transaction = require("../models/Transaction");

// const router = express.Router();

// // Add Transaction
// router.post("/", async (req, res) => {
//     try {
//         let { userId, amount, type, category } = req.body;

//         if (!userId || !amount || !type || !category) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Convert userId to ObjectId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid userId format" });
//         }
//         userId = new mongoose.Types.ObjectId(userId);

//         const newTransaction = new Transaction({ userId, amount, type, category });
//         await newTransaction.save();

//         res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating transaction", error: error.message });
//     }
// });

// // Get Transactions for a User
// router.get("/:userId", async (req, res) => {
//     try {
//         const { userId } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid userId format" });
//         }

//         const transactions = await Transaction.find({ userId });
//         res.json(transactions);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching transactions", error: error.message });
//     }
// });

// module.exports = router;

const express = require("express");
const Transaction = require("../models/Transaction");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to check token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Add Transaction
router.post("/add", authMiddleware, async (req, res) => {
  const { type, amount, category } = req.body;

  if (!type || !amount || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const transaction = new Transaction({
    userId: req.userId,
    type,
    amount,
    category,
  });

  await transaction.save();
  res.status(201).json({ message: "Transaction added successfully!" });
});

// Get User Transactions
router.get("/", authMiddleware, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.userId });
  res.json(transactions);
});

module.exports = router;
