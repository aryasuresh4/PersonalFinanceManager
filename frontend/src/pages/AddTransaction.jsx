import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };
  const handleAddTransaction = async () => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        alert("You must be logged in to add a transaction.");
        return;
      }
  
      console.log("🟡 Sending transaction data:", transactionData);
      
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        transactionData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("✅ Transaction added:", response.data);
  
      navigate("/dashboard"); // Redirect after adding
  
    } catch (error) {
      console.error("❌ Error adding transaction:", error.response?.data || error.message);
    }
  };
  
   

  return (
    <div>
      <h2>Add Transaction</h2>
      <input
        type="number"
        name="amount"
        placeholder="Enter amount"
        value={transactionData.amount}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Enter category"
        value={transactionData.category}
        onChange={handleChange}
      />
      <select name="type" value={transactionData.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="date"
        name="date"
        value={transactionData.date}
        onChange={handleChange}
      />
      <button onClick={handleAddTransaction}>Add Transaction</button>
    </div>
  );
};

export default AddTransaction;
