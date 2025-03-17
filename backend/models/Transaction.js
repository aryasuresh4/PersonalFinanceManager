// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     amount: { type: Number, required: true },
//     type: { type: String, enum: ["income", "expense"], required: true },
//     category: { type: String, required: true },
//     date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Transaction", transactionSchema);
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ["Income", "Expense"], required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
