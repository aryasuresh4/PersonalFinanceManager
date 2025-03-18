import React from "react";

export default function TransactionList({ transactions }) {
  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((transaction) => transaction.category === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.category === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div>
      {/* Display Total Income and Expenses */}
      <div className="stats-container">
        <div className="stat-box total-income">
          <h3>Total Income</h3>
          <p>₹ {totalIncome.toFixed(2)}</p>
        </div>
        <div className="stat-box total-expenses">
          <h3>Total Expenses</h3>
          <p>₹ {totalExpenses.toFixed(2)}</p>
        </div>
      </div>

      {/* Transaction List */}
      <h3>Transaction History</h3>
      <ul className="transaction-list">
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          transactions.map((transaction) => (
            <li key={transaction.id} className={transaction.category}>
              {transaction.taskName} - ₹{transaction.amount} ({transaction.category}) on {transaction.date}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}