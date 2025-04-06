
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import necessary Chart.js components

import TransactionList from "./TransactionList";
import logo from "../assets/spendlylogo.png";
import "../Styles/Dash.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [username, setUsername] = useState(""); // State to hold the username

  // State for transactions and totals
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for new transaction fields
  const [taskName, setTaskName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskName("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  // Fetch username and transactions
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsername(response.data.username); // Set the username
      } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const fetchedTransactions = response.data;
        setTransactions(fetchedTransactions);

        // Calculate totals
        const income = fetchedTransactions
          .filter((txn) => txn.type === "income")
          .reduce((sum, txn) => sum + txn.amount, 0);
        const expenses = fetchedTransactions
          .filter((txn) => txn.type === "expense")
          .reduce((sum, txn) => sum + txn.amount, 0);

        setTotalIncome(income);
        setTotalExpenses(expenses);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchUserProfile();
    fetchTransactions();
  }, []);

  const totalBalance = totalIncome - totalExpenses;

  // Add a new transaction
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!taskName || !amount || !category || !date) {
      alert("All fields are required.");
      return;
    }

    const newTransaction = {
      type: category, // Use 'income' or 'expense'
      amount: parseFloat(amount),
      category: taskName, // Use task name as the category
      date: date || new Date().toISOString().split("T")[0],
    };

    try {
      console.log("New Transaction Payload:", newTransaction); // Debugging
      const response = await axios.post("http://localhost:5000/api/transactions", newTransaction, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const savedTransaction = response.data;
      setTransactions([...transactions, savedTransaction]);

      if (savedTransaction.type === "income") {
        setTotalIncome((prev) => prev + savedTransaction.amount);
      } else if (savedTransaction.type === "expense") {
        setTotalExpenses((prev) => prev + savedTransaction.amount);
      }

      closeModal();
    } catch (error) {
      console.error("Error adding transaction:", error.response?.data || error.message);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth"; // Redirect to login page
  };

  // Prepare Chart Data
  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "₹ Transactions",
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#4CAF50", "#F44336"], // Green for income, red for expenses
        hoverBackgroundColor: ["#45a049", "#e53935"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="left-dash">
        <a href="/">
          <img src={logo} alt="Spendly Logo" className="logo" width="120px" height="38px" />
        </a>
        <div className="logoMain">
          <a href="#" className="dash">Dashboard</a>
          <button className="add-button" onClick={openModal}>+ Add Transaction</button>
          <div className="logout">
            <button className="logout-button" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-content">
      <h2 className="welcome-message">
  Welcome to Spendly{username ? `, ${username}!` : "!"}
</h2>

        <div className="stats-container">
          <div className="stat-box total-income">
            <h3>Total Income</h3>
            <p>₹{totalIncome.toFixed(2)}</p>
          </div>
          <div className="stat-box total-expenses">
            <h3>Total Expenses</h3>
            <p>₹{totalExpenses.toFixed(2)}</p>
          </div>
          <div className="stat-box total-balance">
            <h3>Balance</h3>
            <p>₹{totalBalance.toFixed(2)}</p>
          </div>
        </div>
        {/* Transaction List */}
        <TransactionList transactions={transactions} />
      </div>

        {/* Chart Section */}
        <div className="chart-container">
          <h3>Income vs Expenses</h3>
          <Doughnut data={chartData} />
        </div>

        

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Item</h3>
            <form onSubmit={handleAddItem} className="new-item-form">
              <input
                type="text"
                placeholder="Transaction Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="number"
                placeholder="Enter Amount (₹)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" className="close-button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
