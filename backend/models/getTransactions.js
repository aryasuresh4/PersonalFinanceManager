// const getTransactions = async (req, res) => {
//     try {
//         const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
//         const income = transactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
// const expense = transactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);


//         res.json({ transactions, income, expense });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };