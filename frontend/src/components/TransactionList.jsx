
import axios from "axios";
import { useEffect, useState } from "react";
import '../Styles/Transaction.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    try {
      if (!token) return;

      console.log("🟡 Fetching transactions...");
      const response = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Transactions fetched:", response.data);
      setTransactions(response.data); // ✅ Update transactions state
    } catch (error) {
      console.error("❌ Error fetching transactions:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []); // ✅ Fetch on page load

  return (
    <div className="transaction-list-container">
      <h2>Transaction List</h2>
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions found.</p>
      ) : (
        <ul className="transaction-list">
  {transactions.map((txn) => {
    // Format the date to dd/mm/yyyy
    const formattedDate = new Date(txn.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return (
      <li key={txn._id} className={`transaction-item ${txn.type}`}>
        <span className="category">{txn.category}</span>
        <span className="amount">₹{txn.amount}</span>
        <span className="type">{formattedDate}</span>
      </li>
    );
  })}
</ul>

      )}
      <button className="refresh-button" onClick={fetchTransactions}>
        🔄 Refresh Transactions
      </button>
    </div>
  );
};

export default TransactionList;
