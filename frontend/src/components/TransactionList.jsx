import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Styles/Transaction.css";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [editModal, setEditModal] = useState(null); // For editing transactions
  const [month, setMonth] = useState(""); // Month filter
  const [year, setYear] = useState(""); // Year filter
  const token = localStorage.getItem("token");

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      if (!token) return;

      const response = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions(response.data);
      setFilteredTransactions(response.data); // Show all initially
    } catch (error) {
      console.error("Error fetching transactions:", error.response?.data?.message || error.message);
    }
  };

 
  
  // Open the edit modal


 

      

  // Filter transactions by month and year
  const filterTransactions = () => {
    const filtered = transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      const txnMonth = txnDate.getMonth() + 1; // Months are 0-indexed
      const txnYear = txnDate.getFullYear();

      return (!month || txnMonth === parseInt(month)) && (!year || txnYear === parseInt(year));
    });
    setFilteredTransactions(filtered);
  };

  // Fetch transactions on component load
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Apply filters whenever month, year, or transactions change
  useEffect(() => {
    filterTransactions();
  }, [month, year, transactions]);

  return (
    <div className="transaction-list-container">
      <h2>Transaction List</h2>

      {/* Filters */}
      <div className="filters">
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">All Years</option>
          {[2023, 2024, 2025].map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="no-transactions">No transactions found.</p>
      ) : (
        <ul className="transaction-list">
          {filteredTransactions.map((txn) => {
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

      {/* Refresh Button */}
      <button className="refresh-button" onClick={fetchTransactions}>
        🔄 Refresh Transactions
      </button>

      {/* Edit Modal */}
      
    </div>
  );
};

export default TransactionList;
