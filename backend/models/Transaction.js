const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 1 }, // Ensure positive amount
  category: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
